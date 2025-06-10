"use client"
import { Eye, Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useQuery } from '@tanstack/react-query';
import { usePosts } from "@/hooks/usePosts"
import { useDeletePost } from "@/hooks/useDeletePost"
import Link from "next/link"
// Sample data for the table
const tableData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Editor",
    status: "Inactive",
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
    joinDate: "2024-04-05",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2024-05-12",
  },
  {
    id: 6,
    name: "Lisa Davis",
    email: "lisa@example.com",
    role: "Editor",
    status: "Inactive",
    joinDate: "2024-06-18",
  },
  {
    id: 7,
    name: "Tom Anderson",
    email: "tom@example.com",
    role: "User",
    status: "Active",
    joinDate: "2024-07-22",
  },
  {
    id: 8,
    name: "Emma Taylor",
    email: "emma@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2024-08-30",
  },
]

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  joinDate: string
}

interface UsersTableProps {
  data?: User[]
}


  //  async function getData() {
  //    const queryClient = getQueryClient();
  //    await queryClient.prefetchQuery({
  //     queryKey: ['posts'],
  //     queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.json()),
  //    });
  //  }


export function UsersTable() {
  const { data: posts, isLoading, isError } = usePosts();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

    if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((user:any, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.title.slice(0,20)}</TableCell>
              <TableCell>{user.body.slice(0,10)}</TableCell>
              {/* <TableCell>
                <Badge variant={user.role === "Admin" ? "default" : user.role === "Editor" ? "secondary" : "outline"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={"Active" ? "default" : "destructive"}>{user.status}</Badge>
              </TableCell> */}
              {/* <TableCell>{user.joinDate}</TableCell> */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/${user.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    title="View user"
                    >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View user</span>
                  </Button>
                    </Link>
                  <Link href={`/admin/edit/${user.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    title="Edit user"
                    >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit user</span>
                  </Button>
                    </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer "
                    title="Delete user"
                     onClick={() => deletePost(user.id)}
              disabled={isDeleting}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete user</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
