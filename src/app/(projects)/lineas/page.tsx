import { redirect } from "next/navigation";

export default function LineasPage() {

  redirect('/')
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}