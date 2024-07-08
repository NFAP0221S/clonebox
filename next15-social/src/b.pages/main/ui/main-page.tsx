import { AddPost } from "@/c.widgets/components/add-post";
import { Feed } from "@/c.widgets/components/feed";
import { LeftMenu } from "@/c.widgets/components/left-menu";
import { RightMenu } from "@/c.widgets/components/right-menu";
import { Stories } from "@/c.widgets/components/stories";

export function MainPage() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
