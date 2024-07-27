type TLeftMenu = "home" | "profile"
type TSize = "sm" | "md" | "lg"

interface IProfilePage {
  params: {
    username: string
  }
}

interface IFeed {
  username?: string
}

interface IPost<T> {
  post: T
}

interface ILeftMenu {
  type: TLeftMenu
}

interface IRightMenu<T>  {
  user?: T
}

interface IAd {
  size: TSize
}

interface IUserInfoCardInteraction {
  userId: IAwitchFollow;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}

interface IUser {user: string;}
interface IUserContainer<T = IUser> {user: T;}
interface IUserInfoCard<T = IUser> extends IUserContainer<T> {}
interface IUserMediaCard<T = IUser> extends IUserContainer<T> {}

