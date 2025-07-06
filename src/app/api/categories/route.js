import { useSession } from 'next-auth/react';

const { data: session } = useSession();
const token = session?.token ;

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
}

export async function DELETE(req) {
  const { id } = await req.json();
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!res.ok) {
    return Response.json({ error: 'Failed to delete category' }, { status: res.status });
  }
  
  return Response.json({ message: 'Category deleted successfully' });
}
