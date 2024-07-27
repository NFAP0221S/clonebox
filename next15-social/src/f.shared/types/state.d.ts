interface IUserState {
  following: boolean;
  blocked: boolean;
  followingRequestSent: boolean;
}

type ActionType = 'TOGGLE_FOLLOWING' | 'BLOCK';
interface Action {
  type: ActionType;
}