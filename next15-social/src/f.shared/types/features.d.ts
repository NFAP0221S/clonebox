
interface ISwitchBlock {
  userId: string
}

interface IAddComment {
  postId: number
  desc: string
}

interface IAcceptFollowRequest {
  userId: string
}

interface IDeclineFollowRequest {
  userId: string
}

interface IAwitchFollow {
  userId: string
}

interface ISwitchLike {
  postId: number
}

interface IAddPost {
  formData: FormData
  img: string 
}

interface IDeletePost {
  postId: number
}

interface IUpdateProfile {
  prevState: { 
    success: boolean
    error: boolean 
  },
  payload: { 
    formData: FormData
    cover: string 
  }
}

interface IAddStory {
  img: string
}