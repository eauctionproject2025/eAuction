'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null); // <-- null not ''
  const fileInputRef = useRef(null);

  const { data: session } = useSession();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const addCategory = async (e) => {
    e.preventDefault();

    if (!name || !icon) {
      alert('Please fill in all fields!');
      setName('');
      setIcon(null);
      
      // Reset file input properly
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      return;
    }
    if (icon.size > 2 * 1024 * 1024) { // 2MB limit
      alert('Image size should not exceed 2MB.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('icon', icon);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      setName('');
      setIcon(null);
      fetchCategories();
    } else {
      const error = await res.json();
      alert(`Failed to add category. ${error.message || ''}`);
      setName('');
      setIcon(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  const deleteCategory = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    });

    if (res.ok) {
      fetchCategories();
    } else {
      console.error(await res.json());
      alert('Failed to delete category.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={addCategory} className="flex flex-col space-y-4">
        <input
          type="text"
          //I want only ther first letter to be capitalized
          value={name.toLowerCase()}
          onChange={e => setName(e.target.value)}
          placeholder="Category name"
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={e => setIcon(e.target.files[0])}
          className="border p-2 rounded cursor-pointer"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600">
          Add
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6">Listed Categories</h3>
      {categories.length > 0 ? (
        <ul className="mt-2">
          {categories.map((category) => (
            <li key={category._id} className="flex justify-between border-b py-2">
              <div className='flex items-center'>
                <img src={category.icon} alt={category.name} className="w-8 h-8 mr-2" />
                <span>{category.name}</span>
              </div>
              <button className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={() => deleteCategory(category._id)}>
                Delete
              </button> 
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">No categories found.</p>
      )}
    </div>
  );
}
