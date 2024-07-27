type TLeftMenu = "home" | "profile"
type TSize = "sm" | "md" | "lg"
type TFollowBlock = "follow" | "block"

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
  userId: string
  isUserBlocked: boolean
  isFollowing: boolean
  isFollowingSent: boolean
}

interface IUser {user: string;}
interface IUserContainer<T = IUser> {user: T;}
interface IUserInfoCard<T = IUser> extends IUserContainer<T> {}
interface IUserMediaCard<T = IUser> extends IUserContainer<T> {}

