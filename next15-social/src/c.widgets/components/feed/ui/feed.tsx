import { Post } from "@/c.widgets/components/feed/index";

export function Feed() {
  return (
    <div className='p-4 bg-white shadow-md rounded-lg flex flex-col gap-12' title="피드">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}
