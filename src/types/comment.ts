export enum COMMENT_TYPES {
  COMMENT = "Comment",
  REQUEST_MEDIATOR = "Request Mediator",
}

export interface Comment {
  _id: string;
  description: string;
  type: COMMENT_TYPES;
  createdAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
    role: string;
    adminRole: string;
    programRole: string;
  };
}

export interface CommentAddData {
  reportId: string;
  description: string;
}
