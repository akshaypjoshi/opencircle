import { UsersRouter } from './routers/users';
import { AuthRouter } from './routers/auth';
import { ChannelsRouter } from './routers/channels';
import { PostsRouter } from './routers/posts';
import { MediaRouter } from './routers/media';
import { AccountRouter } from './routers/account';
import { ReactionsRouter } from './routers/reactions';
import { ArticlesRouter } from './routers/articles';
import { CoursesRouter } from './routers/courses';
import { ExtrasRouter } from './routers/extras';
import { InviteCodesRouter } from './routers/invite-codes';
import { NotificationsRouter } from './routers/notifications';
import type {Hooks} from 'ky';

export class Api {
  public users: UsersRouter;
  public auth: AuthRouter;
  public channels: ChannelsRouter;
  public posts: PostsRouter;
  public media: MediaRouter;
  public account: AccountRouter;
  public reactions: ReactionsRouter;
  public articles: ArticlesRouter;
  public courses: CoursesRouter;
  public extras: ExtrasRouter;
  public inviteCodes: InviteCodesRouter;
  public notifications: NotificationsRouter;

  constructor(baseUrl: string, hooks?:  Hooks) {
    this.users = new UsersRouter(baseUrl, hooks);
    this.auth = new AuthRouter(baseUrl, hooks);
    this.channels = new ChannelsRouter(baseUrl, hooks);
    this.posts = new PostsRouter(baseUrl, hooks);
    this.media = new MediaRouter(baseUrl, hooks);
    this.account = new AccountRouter(baseUrl, hooks);
    this.reactions = new ReactionsRouter(baseUrl, hooks);
    this.articles = new ArticlesRouter(baseUrl, hooks);
    this.courses = new CoursesRouter(baseUrl, hooks);
    this.extras = new ExtrasRouter(baseUrl, hooks);
    this.inviteCodes = new InviteCodesRouter(baseUrl, hooks);
    this.notifications = new NotificationsRouter(baseUrl, hooks);
  }
}

// Factory function for creating the API instance
export function createApi(baseUrl: string, hooks?: Hooks): Api {
  return new Api(baseUrl, hooks);
}

// Export all types from the shared types file for convenience
export type {
  User,
  UserCreate,
  UserUpdate,
  UserUpdateWithFile,
  RegisterRequest,
  LoginRequest,
  RegisterResponse,
  LoginResponse,
  Channel,
  ChannelCreate,
  ChannelUpdate,
  Post,
  PostCreate,
  PostUpdate,
  Media,
  MediaCreate,
  MediaUpdate,
  Reaction,
  ReactionCreate,
  Role,
  PostType,
  ChannelType,
  Article,
  ArticleCreate,
  ArticleUpdate,
  Course,
  CourseCreate,
  CourseUpdate,
  Section,
  SectionCreate,
  SectionUpdate,
  Lesson,
  LessonCreate,
  LessonUpdate,
  EnrolledCourse,
  EnrolledCourseCreate,
  EnrolledCourseUpdate,
  CourseStatus,
  LessonType,
  EnrollmentStatus,
  UrlPreview,
  InviteCode,
  InviteCodeCreate,
  InviteCodeUpdate,
  InviteCodeUsageStats,
  InviteCodeValidateRequest,
  InviteCodeValidateResponse,
  InviteCodeStatus,
  Notification,
  NotificationType
} from './types';
