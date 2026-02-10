
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model PersonalProfile
 * 
 */
export type PersonalProfile = $Result.DefaultSelection<Prisma.$PersonalProfilePayload>
/**
 * Model AcademicProfile
 * 
 */
export type AcademicProfile = $Result.DefaultSelection<Prisma.$AcademicProfilePayload>
/**
 * Model Transcript
 * 
 */
export type Transcript = $Result.DefaultSelection<Prisma.$TranscriptPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model TestScore
 * 
 */
export type TestScore = $Result.DefaultSelection<Prisma.$TestScorePayload>
/**
 * Model Achievement
 * 
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>
/**
 * Model ProjectExperience
 * 
 */
export type ProjectExperience = $Result.DefaultSelection<Prisma.$ProjectExperiencePayload>
/**
 * Model MeetingLog
 * 
 */
export type MeetingLog = $Result.DefaultSelection<Prisma.$MeetingLogPayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model ActivityCategory
 * 
 */
export type ActivityCategory = $Result.DefaultSelection<Prisma.$ActivityCategoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  counselor: 'counselor',
  coordinator: 'coordinator',
  student: 'student'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const GradeLevel: {
  ninth: 'ninth',
  tenth: 'tenth',
  eleventh: 'eleventh',
  twelfth: 'twelfth'
};

export type GradeLevel = (typeof GradeLevel)[keyof typeof GradeLevel]


export const CurriculumType: {
  CBSE: 'CBSE',
  ICSE: 'ICSE',
  IB: 'IB',
  CAIE: 'CAIE',
  State_Board: 'State_Board',
  US_High_School: 'US_High_School',
  Other: 'Other'
};

export type CurriculumType = (typeof CurriculumType)[keyof typeof CurriculumType]


export const GradingSystemType: {
  Marks_Out_Of_100: 'Marks_Out_Of_100',
  Percentage: 'Percentage',
  IB_Scale: 'IB_Scale',
  Letter_Grade: 'Letter_Grade',
  Other: 'Other'
};

export type GradingSystemType = (typeof GradingSystemType)[keyof typeof GradingSystemType]


export const Semester: {
  Fall: 'Fall',
  Spring: 'Spring',
  Full_Year: 'Full_Year'
};

export type Semester = (typeof Semester)[keyof typeof Semester]


export const HonorsLevel: {
  Standard: 'Standard',
  Honors: 'Honors',
  AP: 'AP',
  IB_HL: 'IB_HL',
  IB_SL: 'IB_SL'
};

export type HonorsLevel = (typeof HonorsLevel)[keyof typeof HonorsLevel]


export const AchievementType: {
  Award_Honor: 'Award_Honor',
  Competition: 'Competition',
  Leadership: 'Leadership',
  Social_Impact: 'Social_Impact',
  Extracurricular: 'Extracurricular'
};

export type AchievementType = (typeof AchievementType)[keyof typeof AchievementType]


export const RecognitionLevel: {
  School: 'School',
  Inter_School: 'Inter_School',
  District: 'District',
  City: 'City',
  State: 'State',
  National: 'National',
  International: 'International'
};

export type RecognitionLevel = (typeof RecognitionLevel)[keyof typeof RecognitionLevel]


export const ExperienceType: {
  Academic_Project: 'Academic_Project',
  Independent_Project: 'Independent_Project',
  Research: 'Research',
  Internship: 'Internship',
  Summer_Program: 'Summer_Program',
  Work_Experience: 'Work_Experience'
};

export type ExperienceType = (typeof ExperienceType)[keyof typeof ExperienceType]


export const ProjectStatus: {
  Completed: 'Completed',
  In_Progress: 'In_Progress',
  Planned: 'Planned'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type GradeLevel = $Enums.GradeLevel

export const GradeLevel: typeof $Enums.GradeLevel

export type CurriculumType = $Enums.CurriculumType

export const CurriculumType: typeof $Enums.CurriculumType

export type GradingSystemType = $Enums.GradingSystemType

export const GradingSystemType: typeof $Enums.GradingSystemType

export type Semester = $Enums.Semester

export const Semester: typeof $Enums.Semester

export type HonorsLevel = $Enums.HonorsLevel

export const HonorsLevel: typeof $Enums.HonorsLevel

export type AchievementType = $Enums.AchievementType

export const AchievementType: typeof $Enums.AchievementType

export type RecognitionLevel = $Enums.RecognitionLevel

export const RecognitionLevel: typeof $Enums.RecognitionLevel

export type ExperienceType = $Enums.ExperienceType

export const ExperienceType: typeof $Enums.ExperienceType

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personalProfile`: Exposes CRUD operations for the **PersonalProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PersonalProfiles
    * const personalProfiles = await prisma.personalProfile.findMany()
    * ```
    */
  get personalProfile(): Prisma.PersonalProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicProfile`: Exposes CRUD operations for the **AcademicProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicProfiles
    * const academicProfiles = await prisma.academicProfile.findMany()
    * ```
    */
  get academicProfile(): Prisma.AcademicProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transcript`: Exposes CRUD operations for the **Transcript** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transcripts
    * const transcripts = await prisma.transcript.findMany()
    * ```
    */
  get transcript(): Prisma.TranscriptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testScore`: Exposes CRUD operations for the **TestScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestScores
    * const testScores = await prisma.testScore.findMany()
    * ```
    */
  get testScore(): Prisma.TestScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectExperience`: Exposes CRUD operations for the **ProjectExperience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectExperiences
    * const projectExperiences = await prisma.projectExperience.findMany()
    * ```
    */
  get projectExperience(): Prisma.ProjectExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meetingLog`: Exposes CRUD operations for the **MeetingLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MeetingLogs
    * const meetingLogs = await prisma.meetingLog.findMany()
    * ```
    */
  get meetingLog(): Prisma.MeetingLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityCategory`: Exposes CRUD operations for the **ActivityCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityCategories
    * const activityCategories = await prisma.activityCategory.findMany()
    * ```
    */
  get activityCategory(): Prisma.ActivityCategoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organization: 'Organization',
    User: 'User',
    Student: 'Student',
    PersonalProfile: 'PersonalProfile',
    AcademicProfile: 'AcademicProfile',
    Transcript: 'Transcript',
    Activity: 'Activity',
    TestScore: 'TestScore',
    Achievement: 'Achievement',
    ProjectExperience: 'ProjectExperience',
    MeetingLog: 'MeetingLog',
    Subject: 'Subject',
    ActivityCategory: 'ActivityCategory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organization" | "user" | "student" | "personalProfile" | "academicProfile" | "transcript" | "activity" | "testScore" | "achievement" | "projectExperience" | "meetingLog" | "subject" | "activityCategory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      PersonalProfile: {
        payload: Prisma.$PersonalProfilePayload<ExtArgs>
        fields: Prisma.PersonalProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonalProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonalProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>
          }
          findFirst: {
            args: Prisma.PersonalProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonalProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>
          }
          findMany: {
            args: Prisma.PersonalProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>[]
          }
          create: {
            args: Prisma.PersonalProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>
          }
          createMany: {
            args: Prisma.PersonalProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonalProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>[]
          }
          delete: {
            args: Prisma.PersonalProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>
          }
          update: {
            args: Prisma.PersonalProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>
          }
          deleteMany: {
            args: Prisma.PersonalProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonalProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonalProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>[]
          }
          upsert: {
            args: Prisma.PersonalProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalProfilePayload>
          }
          aggregate: {
            args: Prisma.PersonalProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonalProfile>
          }
          groupBy: {
            args: Prisma.PersonalProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonalProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonalProfileCountArgs<ExtArgs>
            result: $Utils.Optional<PersonalProfileCountAggregateOutputType> | number
          }
        }
      }
      AcademicProfile: {
        payload: Prisma.$AcademicProfilePayload<ExtArgs>
        fields: Prisma.AcademicProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>
          }
          findFirst: {
            args: Prisma.AcademicProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>
          }
          findMany: {
            args: Prisma.AcademicProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>[]
          }
          create: {
            args: Prisma.AcademicProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>
          }
          createMany: {
            args: Prisma.AcademicProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>[]
          }
          delete: {
            args: Prisma.AcademicProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>
          }
          update: {
            args: Prisma.AcademicProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>
          }
          deleteMany: {
            args: Prisma.AcademicProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>[]
          }
          upsert: {
            args: Prisma.AcademicProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicProfilePayload>
          }
          aggregate: {
            args: Prisma.AcademicProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicProfile>
          }
          groupBy: {
            args: Prisma.AcademicProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicProfileCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicProfileCountAggregateOutputType> | number
          }
        }
      }
      Transcript: {
        payload: Prisma.$TranscriptPayload<ExtArgs>
        fields: Prisma.TranscriptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TranscriptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TranscriptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          findFirst: {
            args: Prisma.TranscriptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TranscriptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          findMany: {
            args: Prisma.TranscriptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>[]
          }
          create: {
            args: Prisma.TranscriptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          createMany: {
            args: Prisma.TranscriptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TranscriptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>[]
          }
          delete: {
            args: Prisma.TranscriptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          update: {
            args: Prisma.TranscriptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          deleteMany: {
            args: Prisma.TranscriptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TranscriptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TranscriptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>[]
          }
          upsert: {
            args: Prisma.TranscriptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TranscriptPayload>
          }
          aggregate: {
            args: Prisma.TranscriptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTranscript>
          }
          groupBy: {
            args: Prisma.TranscriptGroupByArgs<ExtArgs>
            result: $Utils.Optional<TranscriptGroupByOutputType>[]
          }
          count: {
            args: Prisma.TranscriptCountArgs<ExtArgs>
            result: $Utils.Optional<TranscriptCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      TestScore: {
        payload: Prisma.$TestScorePayload<ExtArgs>
        fields: Prisma.TestScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          findFirst: {
            args: Prisma.TestScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          findMany: {
            args: Prisma.TestScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          create: {
            args: Prisma.TestScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          createMany: {
            args: Prisma.TestScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          delete: {
            args: Prisma.TestScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          update: {
            args: Prisma.TestScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          deleteMany: {
            args: Prisma.TestScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>[]
          }
          upsert: {
            args: Prisma.TestScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestScorePayload>
          }
          aggregate: {
            args: Prisma.TestScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestScore>
          }
          groupBy: {
            args: Prisma.TestScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestScoreCountArgs<ExtArgs>
            result: $Utils.Optional<TestScoreCountAggregateOutputType> | number
          }
        }
      }
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>
        fields: Prisma.AchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          createMany: {
            args: Prisma.AchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AchievementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievement>
          }
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementCountAggregateOutputType> | number
          }
        }
      }
      ProjectExperience: {
        payload: Prisma.$ProjectExperiencePayload<ExtArgs>
        fields: Prisma.ProjectExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>
          }
          findFirst: {
            args: Prisma.ProjectExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>
          }
          findMany: {
            args: Prisma.ProjectExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>[]
          }
          create: {
            args: Prisma.ProjectExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>
          }
          createMany: {
            args: Prisma.ProjectExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>[]
          }
          delete: {
            args: Prisma.ProjectExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>
          }
          update: {
            args: Prisma.ProjectExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>
          }
          deleteMany: {
            args: Prisma.ProjectExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>[]
          }
          upsert: {
            args: Prisma.ProjectExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectExperiencePayload>
          }
          aggregate: {
            args: Prisma.ProjectExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectExperience>
          }
          groupBy: {
            args: Prisma.ProjectExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectExperienceCountAggregateOutputType> | number
          }
        }
      }
      MeetingLog: {
        payload: Prisma.$MeetingLogPayload<ExtArgs>
        fields: Prisma.MeetingLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeetingLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeetingLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>
          }
          findFirst: {
            args: Prisma.MeetingLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeetingLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>
          }
          findMany: {
            args: Prisma.MeetingLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>[]
          }
          create: {
            args: Prisma.MeetingLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>
          }
          createMany: {
            args: Prisma.MeetingLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MeetingLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>[]
          }
          delete: {
            args: Prisma.MeetingLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>
          }
          update: {
            args: Prisma.MeetingLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>
          }
          deleteMany: {
            args: Prisma.MeetingLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeetingLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MeetingLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>[]
          }
          upsert: {
            args: Prisma.MeetingLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeetingLogPayload>
          }
          aggregate: {
            args: Prisma.MeetingLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeetingLog>
          }
          groupBy: {
            args: Prisma.MeetingLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeetingLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeetingLogCountArgs<ExtArgs>
            result: $Utils.Optional<MeetingLogCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      ActivityCategory: {
        payload: Prisma.$ActivityCategoryPayload<ExtArgs>
        fields: Prisma.ActivityCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>
          }
          findFirst: {
            args: Prisma.ActivityCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>
          }
          findMany: {
            args: Prisma.ActivityCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>[]
          }
          create: {
            args: Prisma.ActivityCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>
          }
          createMany: {
            args: Prisma.ActivityCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>[]
          }
          delete: {
            args: Prisma.ActivityCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>
          }
          update: {
            args: Prisma.ActivityCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ActivityCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ActivityCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityCategoryPayload>
          }
          aggregate: {
            args: Prisma.ActivityCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityCategory>
          }
          groupBy: {
            args: Prisma.ActivityCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCategoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    organization?: OrganizationOmit
    user?: UserOmit
    student?: StudentOmit
    personalProfile?: PersonalProfileOmit
    academicProfile?: AcademicProfileOmit
    transcript?: TranscriptOmit
    activity?: ActivityOmit
    testScore?: TestScoreOmit
    achievement?: AchievementOmit
    projectExperience?: ProjectExperienceOmit
    meetingLog?: MeetingLogOmit
    subject?: SubjectOmit
    activityCategory?: ActivityCategoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    users: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    coordinated_students: number
    meeting_logs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coordinated_students?: boolean | UserCountOutputTypeCountCoordinated_studentsArgs
    meeting_logs?: boolean | UserCountOutputTypeCountMeeting_logsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCoordinated_studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMeeting_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingLogWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    transcripts: number
    activities: number
    test_scores: number
    achievements: number
    project_experiences: number
    meeting_logs: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transcripts?: boolean | StudentCountOutputTypeCountTranscriptsArgs
    activities?: boolean | StudentCountOutputTypeCountActivitiesArgs
    test_scores?: boolean | StudentCountOutputTypeCountTest_scoresArgs
    achievements?: boolean | StudentCountOutputTypeCountAchievementsArgs
    project_experiences?: boolean | StudentCountOutputTypeCountProject_experiencesArgs
    meeting_logs?: boolean | StudentCountOutputTypeCountMeeting_logsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountTranscriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranscriptWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountTest_scoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestScoreWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountProject_experiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectExperienceWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountMeeting_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    logo_url: string | null
    primary_color: string | null
    created_at: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    logo_url: string | null
    primary_color: string | null
    created_at: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    logo_url: number
    primary_color: number
    created_at: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    logo_url?: true
    primary_color?: true
    created_at?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    logo_url?: true
    primary_color?: true
    created_at?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    logo_url?: true
    primary_color?: true
    created_at?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    logo_url: string | null
    primary_color: string
    created_at: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logo_url?: boolean
    primary_color?: boolean
    created_at?: boolean
    users?: boolean | Organization$usersArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logo_url?: boolean
    primary_color?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    logo_url?: boolean
    primary_color?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    logo_url?: boolean
    primary_color?: boolean
    created_at?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "logo_url" | "primary_color" | "created_at", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Organization$usersArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      logo_url: string | null
      primary_color: string
      created_at: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Organization$usersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly logo_url: FieldRef<"Organization", 'String'>
    readonly primary_color: FieldRef<"Organization", 'String'>
    readonly created_at: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.users
   */
  export type Organization$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    organization_id: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.UserRole | null
    first_name: string | null
    last_name: string | null
    created_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    organization_id: string | null
    email: string | null
    password_hash: string | null
    role: $Enums.UserRole | null
    first_name: string | null
    last_name: string | null
    created_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    organization_id: number
    email: number
    password_hash: number
    role: number
    first_name: number
    last_name: number
    created_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    organization_id?: true
    email?: true
    password_hash?: true
    role?: true
    first_name?: true
    last_name?: true
    created_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    organization_id?: true
    email?: true
    password_hash?: true
    role?: true
    first_name?: true
    last_name?: true
    created_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    organization_id?: true
    email?: true
    password_hash?: true
    role?: true
    first_name?: true
    last_name?: true
    created_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    organization_id: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    first_name?: boolean
    last_name?: boolean
    created_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    student?: boolean | User$studentArgs<ExtArgs>
    coordinated_students?: boolean | User$coordinated_studentsArgs<ExtArgs>
    meeting_logs?: boolean | User$meeting_logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    first_name?: boolean
    last_name?: boolean
    created_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organization_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    first_name?: boolean
    last_name?: boolean
    created_at?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    organization_id?: boolean
    email?: boolean
    password_hash?: boolean
    role?: boolean
    first_name?: boolean
    last_name?: boolean
    created_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "organization_id" | "email" | "password_hash" | "role" | "first_name" | "last_name" | "created_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    student?: boolean | User$studentArgs<ExtArgs>
    coordinated_students?: boolean | User$coordinated_studentsArgs<ExtArgs>
    meeting_logs?: boolean | User$meeting_logsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
      student: Prisma.$StudentPayload<ExtArgs> | null
      coordinated_students: Prisma.$StudentPayload<ExtArgs>[]
      meeting_logs: Prisma.$MeetingLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organization_id: string
      email: string
      password_hash: string
      role: $Enums.UserRole
      first_name: string
      last_name: string
      created_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends User$studentArgs<ExtArgs> = {}>(args?: Subset<T, User$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    coordinated_students<T extends User$coordinated_studentsArgs<ExtArgs> = {}>(args?: Subset<T, User$coordinated_studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    meeting_logs<T extends User$meeting_logsArgs<ExtArgs> = {}>(args?: Subset<T, User$meeting_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly organization_id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.student
   */
  export type User$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * User.coordinated_students
   */
  export type User$coordinated_studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * User.meeting_logs
   */
  export type User$meeting_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    where?: MeetingLogWhereInput
    orderBy?: MeetingLogOrderByWithRelationInput | MeetingLogOrderByWithRelationInput[]
    cursor?: MeetingLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingLogScalarFieldEnum | MeetingLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    graduation_year: number | null
    profile_completion_pct: number | null
  }

  export type StudentSumAggregateOutputType = {
    graduation_year: number | null
    profile_completion_pct: number | null
  }

  export type StudentMinAggregateOutputType = {
    user_id: string | null
    graduation_year: number | null
    current_grade: $Enums.GradeLevel | null
    primary_coordinator_id: string | null
    profile_completion_pct: number | null
  }

  export type StudentMaxAggregateOutputType = {
    user_id: string | null
    graduation_year: number | null
    current_grade: $Enums.GradeLevel | null
    primary_coordinator_id: string | null
    profile_completion_pct: number | null
  }

  export type StudentCountAggregateOutputType = {
    user_id: number
    graduation_year: number
    current_grade: number
    primary_coordinator_id: number
    profile_completion_pct: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    graduation_year?: true
    profile_completion_pct?: true
  }

  export type StudentSumAggregateInputType = {
    graduation_year?: true
    profile_completion_pct?: true
  }

  export type StudentMinAggregateInputType = {
    user_id?: true
    graduation_year?: true
    current_grade?: true
    primary_coordinator_id?: true
    profile_completion_pct?: true
  }

  export type StudentMaxAggregateInputType = {
    user_id?: true
    graduation_year?: true
    current_grade?: true
    primary_coordinator_id?: true
    profile_completion_pct?: true
  }

  export type StudentCountAggregateInputType = {
    user_id?: true
    graduation_year?: true
    current_grade?: true
    primary_coordinator_id?: true
    profile_completion_pct?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id: string | null
    profile_completion_pct: number
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    graduation_year?: boolean
    current_grade?: boolean
    primary_coordinator_id?: boolean
    profile_completion_pct?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    primary_coordinator?: boolean | Student$primary_coordinatorArgs<ExtArgs>
    personal_profile?: boolean | Student$personal_profileArgs<ExtArgs>
    academic_profile?: boolean | Student$academic_profileArgs<ExtArgs>
    transcripts?: boolean | Student$transcriptsArgs<ExtArgs>
    activities?: boolean | Student$activitiesArgs<ExtArgs>
    test_scores?: boolean | Student$test_scoresArgs<ExtArgs>
    achievements?: boolean | Student$achievementsArgs<ExtArgs>
    project_experiences?: boolean | Student$project_experiencesArgs<ExtArgs>
    meeting_logs?: boolean | Student$meeting_logsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    graduation_year?: boolean
    current_grade?: boolean
    primary_coordinator_id?: boolean
    profile_completion_pct?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    primary_coordinator?: boolean | Student$primary_coordinatorArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    graduation_year?: boolean
    current_grade?: boolean
    primary_coordinator_id?: boolean
    profile_completion_pct?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    primary_coordinator?: boolean | Student$primary_coordinatorArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    user_id?: boolean
    graduation_year?: boolean
    current_grade?: boolean
    primary_coordinator_id?: boolean
    profile_completion_pct?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "graduation_year" | "current_grade" | "primary_coordinator_id" | "profile_completion_pct", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    primary_coordinator?: boolean | Student$primary_coordinatorArgs<ExtArgs>
    personal_profile?: boolean | Student$personal_profileArgs<ExtArgs>
    academic_profile?: boolean | Student$academic_profileArgs<ExtArgs>
    transcripts?: boolean | Student$transcriptsArgs<ExtArgs>
    activities?: boolean | Student$activitiesArgs<ExtArgs>
    test_scores?: boolean | Student$test_scoresArgs<ExtArgs>
    achievements?: boolean | Student$achievementsArgs<ExtArgs>
    project_experiences?: boolean | Student$project_experiencesArgs<ExtArgs>
    meeting_logs?: boolean | Student$meeting_logsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    primary_coordinator?: boolean | Student$primary_coordinatorArgs<ExtArgs>
  }
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    primary_coordinator?: boolean | Student$primary_coordinatorArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      primary_coordinator: Prisma.$UserPayload<ExtArgs> | null
      personal_profile: Prisma.$PersonalProfilePayload<ExtArgs> | null
      academic_profile: Prisma.$AcademicProfilePayload<ExtArgs> | null
      transcripts: Prisma.$TranscriptPayload<ExtArgs>[]
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      test_scores: Prisma.$TestScorePayload<ExtArgs>[]
      achievements: Prisma.$AchievementPayload<ExtArgs>[]
      project_experiences: Prisma.$ProjectExperiencePayload<ExtArgs>[]
      meeting_logs: Prisma.$MeetingLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      graduation_year: number
      current_grade: $Enums.GradeLevel
      primary_coordinator_id: string | null
      profile_completion_pct: number
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const studentWithUser_idOnly = await prisma.student.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `user_id`
     * const studentWithUser_idOnly = await prisma.student.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `user_id`
     * const studentWithUser_idOnly = await prisma.student.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    primary_coordinator<T extends Student$primary_coordinatorArgs<ExtArgs> = {}>(args?: Subset<T, Student$primary_coordinatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    personal_profile<T extends Student$personal_profileArgs<ExtArgs> = {}>(args?: Subset<T, Student$personal_profileArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    academic_profile<T extends Student$academic_profileArgs<ExtArgs> = {}>(args?: Subset<T, Student$academic_profileArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transcripts<T extends Student$transcriptsArgs<ExtArgs> = {}>(args?: Subset<T, Student$transcriptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activities<T extends Student$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Student$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    test_scores<T extends Student$test_scoresArgs<ExtArgs> = {}>(args?: Subset<T, Student$test_scoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    achievements<T extends Student$achievementsArgs<ExtArgs> = {}>(args?: Subset<T, Student$achievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    project_experiences<T extends Student$project_experiencesArgs<ExtArgs> = {}>(args?: Subset<T, Student$project_experiencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    meeting_logs<T extends Student$meeting_logsArgs<ExtArgs> = {}>(args?: Subset<T, Student$meeting_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly user_id: FieldRef<"Student", 'String'>
    readonly graduation_year: FieldRef<"Student", 'Int'>
    readonly current_grade: FieldRef<"Student", 'GradeLevel'>
    readonly primary_coordinator_id: FieldRef<"Student", 'String'>
    readonly profile_completion_pct: FieldRef<"Student", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.primary_coordinator
   */
  export type Student$primary_coordinatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Student.personal_profile
   */
  export type Student$personal_profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    where?: PersonalProfileWhereInput
  }

  /**
   * Student.academic_profile
   */
  export type Student$academic_profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    where?: AcademicProfileWhereInput
  }

  /**
   * Student.transcripts
   */
  export type Student$transcriptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    where?: TranscriptWhereInput
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    cursor?: TranscriptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Student.activities
   */
  export type Student$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Student.test_scores
   */
  export type Student$test_scoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    where?: TestScoreWhereInput
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    cursor?: TestScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * Student.achievements
   */
  export type Student$achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    cursor?: AchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Student.project_experiences
   */
  export type Student$project_experiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    where?: ProjectExperienceWhereInput
    orderBy?: ProjectExperienceOrderByWithRelationInput | ProjectExperienceOrderByWithRelationInput[]
    cursor?: ProjectExperienceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectExperienceScalarFieldEnum | ProjectExperienceScalarFieldEnum[]
  }

  /**
   * Student.meeting_logs
   */
  export type Student$meeting_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    where?: MeetingLogWhereInput
    orderBy?: MeetingLogOrderByWithRelationInput | MeetingLogOrderByWithRelationInput[]
    cursor?: MeetingLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MeetingLogScalarFieldEnum | MeetingLogScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model PersonalProfile
   */

  export type AggregatePersonalProfile = {
    _count: PersonalProfileCountAggregateOutputType | null
    _min: PersonalProfileMinAggregateOutputType | null
    _max: PersonalProfileMaxAggregateOutputType | null
  }

  export type PersonalProfileMinAggregateOutputType = {
    student_id: string | null
    preferred_name: string | null
    date_of_birth: Date | null
    phone: string | null
    current_school: string | null
    school_location: string | null
    parent_name: string | null
    parent_email: string | null
    parent_phone: string | null
    created_at: Date | null
  }

  export type PersonalProfileMaxAggregateOutputType = {
    student_id: string | null
    preferred_name: string | null
    date_of_birth: Date | null
    phone: string | null
    current_school: string | null
    school_location: string | null
    parent_name: string | null
    parent_email: string | null
    parent_phone: string | null
    created_at: Date | null
  }

  export type PersonalProfileCountAggregateOutputType = {
    student_id: number
    preferred_name: number
    date_of_birth: number
    phone: number
    current_school: number
    school_location: number
    parent_name: number
    parent_email: number
    parent_phone: number
    created_at: number
    _all: number
  }


  export type PersonalProfileMinAggregateInputType = {
    student_id?: true
    preferred_name?: true
    date_of_birth?: true
    phone?: true
    current_school?: true
    school_location?: true
    parent_name?: true
    parent_email?: true
    parent_phone?: true
    created_at?: true
  }

  export type PersonalProfileMaxAggregateInputType = {
    student_id?: true
    preferred_name?: true
    date_of_birth?: true
    phone?: true
    current_school?: true
    school_location?: true
    parent_name?: true
    parent_email?: true
    parent_phone?: true
    created_at?: true
  }

  export type PersonalProfileCountAggregateInputType = {
    student_id?: true
    preferred_name?: true
    date_of_birth?: true
    phone?: true
    current_school?: true
    school_location?: true
    parent_name?: true
    parent_email?: true
    parent_phone?: true
    created_at?: true
    _all?: true
  }

  export type PersonalProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalProfile to aggregate.
     */
    where?: PersonalProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalProfiles to fetch.
     */
    orderBy?: PersonalProfileOrderByWithRelationInput | PersonalProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonalProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PersonalProfiles
    **/
    _count?: true | PersonalProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonalProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonalProfileMaxAggregateInputType
  }

  export type GetPersonalProfileAggregateType<T extends PersonalProfileAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonalProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonalProfile[P]>
      : GetScalarType<T[P], AggregatePersonalProfile[P]>
  }




  export type PersonalProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalProfileWhereInput
    orderBy?: PersonalProfileOrderByWithAggregationInput | PersonalProfileOrderByWithAggregationInput[]
    by: PersonalProfileScalarFieldEnum[] | PersonalProfileScalarFieldEnum
    having?: PersonalProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonalProfileCountAggregateInputType | true
    _min?: PersonalProfileMinAggregateInputType
    _max?: PersonalProfileMaxAggregateInputType
  }

  export type PersonalProfileGroupByOutputType = {
    student_id: string
    preferred_name: string | null
    date_of_birth: Date | null
    phone: string | null
    current_school: string | null
    school_location: string | null
    parent_name: string | null
    parent_email: string | null
    parent_phone: string | null
    created_at: Date
    _count: PersonalProfileCountAggregateOutputType | null
    _min: PersonalProfileMinAggregateOutputType | null
    _max: PersonalProfileMaxAggregateOutputType | null
  }

  type GetPersonalProfileGroupByPayload<T extends PersonalProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonalProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonalProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonalProfileGroupByOutputType[P]>
            : GetScalarType<T[P], PersonalProfileGroupByOutputType[P]>
        }
      >
    >


  export type PersonalProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_id?: boolean
    preferred_name?: boolean
    date_of_birth?: boolean
    phone?: boolean
    current_school?: boolean
    school_location?: boolean
    parent_name?: boolean
    parent_email?: boolean
    parent_phone?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalProfile"]>

  export type PersonalProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_id?: boolean
    preferred_name?: boolean
    date_of_birth?: boolean
    phone?: boolean
    current_school?: boolean
    school_location?: boolean
    parent_name?: boolean
    parent_email?: boolean
    parent_phone?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalProfile"]>

  export type PersonalProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_id?: boolean
    preferred_name?: boolean
    date_of_birth?: boolean
    phone?: boolean
    current_school?: boolean
    school_location?: boolean
    parent_name?: boolean
    parent_email?: boolean
    parent_phone?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personalProfile"]>

  export type PersonalProfileSelectScalar = {
    student_id?: boolean
    preferred_name?: boolean
    date_of_birth?: boolean
    phone?: boolean
    current_school?: boolean
    school_location?: boolean
    parent_name?: boolean
    parent_email?: boolean
    parent_phone?: boolean
    created_at?: boolean
  }

  export type PersonalProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"student_id" | "preferred_name" | "date_of_birth" | "phone" | "current_school" | "school_location" | "parent_name" | "parent_email" | "parent_phone" | "created_at", ExtArgs["result"]["personalProfile"]>
  export type PersonalProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type PersonalProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type PersonalProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $PersonalProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PersonalProfile"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      student_id: string
      preferred_name: string | null
      date_of_birth: Date | null
      phone: string | null
      current_school: string | null
      school_location: string | null
      parent_name: string | null
      parent_email: string | null
      parent_phone: string | null
      created_at: Date
    }, ExtArgs["result"]["personalProfile"]>
    composites: {}
  }

  type PersonalProfileGetPayload<S extends boolean | null | undefined | PersonalProfileDefaultArgs> = $Result.GetResult<Prisma.$PersonalProfilePayload, S>

  type PersonalProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonalProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonalProfileCountAggregateInputType | true
    }

  export interface PersonalProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PersonalProfile'], meta: { name: 'PersonalProfile' } }
    /**
     * Find zero or one PersonalProfile that matches the filter.
     * @param {PersonalProfileFindUniqueArgs} args - Arguments to find a PersonalProfile
     * @example
     * // Get one PersonalProfile
     * const personalProfile = await prisma.personalProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonalProfileFindUniqueArgs>(args: SelectSubset<T, PersonalProfileFindUniqueArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PersonalProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonalProfileFindUniqueOrThrowArgs} args - Arguments to find a PersonalProfile
     * @example
     * // Get one PersonalProfile
     * const personalProfile = await prisma.personalProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonalProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonalProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalProfileFindFirstArgs} args - Arguments to find a PersonalProfile
     * @example
     * // Get one PersonalProfile
     * const personalProfile = await prisma.personalProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonalProfileFindFirstArgs>(args?: SelectSubset<T, PersonalProfileFindFirstArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PersonalProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalProfileFindFirstOrThrowArgs} args - Arguments to find a PersonalProfile
     * @example
     * // Get one PersonalProfile
     * const personalProfile = await prisma.personalProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonalProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonalProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PersonalProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PersonalProfiles
     * const personalProfiles = await prisma.personalProfile.findMany()
     * 
     * // Get first 10 PersonalProfiles
     * const personalProfiles = await prisma.personalProfile.findMany({ take: 10 })
     * 
     * // Only select the `student_id`
     * const personalProfileWithStudent_idOnly = await prisma.personalProfile.findMany({ select: { student_id: true } })
     * 
     */
    findMany<T extends PersonalProfileFindManyArgs>(args?: SelectSubset<T, PersonalProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PersonalProfile.
     * @param {PersonalProfileCreateArgs} args - Arguments to create a PersonalProfile.
     * @example
     * // Create one PersonalProfile
     * const PersonalProfile = await prisma.personalProfile.create({
     *   data: {
     *     // ... data to create a PersonalProfile
     *   }
     * })
     * 
     */
    create<T extends PersonalProfileCreateArgs>(args: SelectSubset<T, PersonalProfileCreateArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PersonalProfiles.
     * @param {PersonalProfileCreateManyArgs} args - Arguments to create many PersonalProfiles.
     * @example
     * // Create many PersonalProfiles
     * const personalProfile = await prisma.personalProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonalProfileCreateManyArgs>(args?: SelectSubset<T, PersonalProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PersonalProfiles and returns the data saved in the database.
     * @param {PersonalProfileCreateManyAndReturnArgs} args - Arguments to create many PersonalProfiles.
     * @example
     * // Create many PersonalProfiles
     * const personalProfile = await prisma.personalProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PersonalProfiles and only return the `student_id`
     * const personalProfileWithStudent_idOnly = await prisma.personalProfile.createManyAndReturn({
     *   select: { student_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonalProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonalProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PersonalProfile.
     * @param {PersonalProfileDeleteArgs} args - Arguments to delete one PersonalProfile.
     * @example
     * // Delete one PersonalProfile
     * const PersonalProfile = await prisma.personalProfile.delete({
     *   where: {
     *     // ... filter to delete one PersonalProfile
     *   }
     * })
     * 
     */
    delete<T extends PersonalProfileDeleteArgs>(args: SelectSubset<T, PersonalProfileDeleteArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PersonalProfile.
     * @param {PersonalProfileUpdateArgs} args - Arguments to update one PersonalProfile.
     * @example
     * // Update one PersonalProfile
     * const personalProfile = await prisma.personalProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonalProfileUpdateArgs>(args: SelectSubset<T, PersonalProfileUpdateArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PersonalProfiles.
     * @param {PersonalProfileDeleteManyArgs} args - Arguments to filter PersonalProfiles to delete.
     * @example
     * // Delete a few PersonalProfiles
     * const { count } = await prisma.personalProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonalProfileDeleteManyArgs>(args?: SelectSubset<T, PersonalProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PersonalProfiles
     * const personalProfile = await prisma.personalProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonalProfileUpdateManyArgs>(args: SelectSubset<T, PersonalProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PersonalProfiles and returns the data updated in the database.
     * @param {PersonalProfileUpdateManyAndReturnArgs} args - Arguments to update many PersonalProfiles.
     * @example
     * // Update many PersonalProfiles
     * const personalProfile = await prisma.personalProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PersonalProfiles and only return the `student_id`
     * const personalProfileWithStudent_idOnly = await prisma.personalProfile.updateManyAndReturn({
     *   select: { student_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonalProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonalProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PersonalProfile.
     * @param {PersonalProfileUpsertArgs} args - Arguments to update or create a PersonalProfile.
     * @example
     * // Update or create a PersonalProfile
     * const personalProfile = await prisma.personalProfile.upsert({
     *   create: {
     *     // ... data to create a PersonalProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PersonalProfile we want to update
     *   }
     * })
     */
    upsert<T extends PersonalProfileUpsertArgs>(args: SelectSubset<T, PersonalProfileUpsertArgs<ExtArgs>>): Prisma__PersonalProfileClient<$Result.GetResult<Prisma.$PersonalProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PersonalProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalProfileCountArgs} args - Arguments to filter PersonalProfiles to count.
     * @example
     * // Count the number of PersonalProfiles
     * const count = await prisma.personalProfile.count({
     *   where: {
     *     // ... the filter for the PersonalProfiles we want to count
     *   }
     * })
    **/
    count<T extends PersonalProfileCountArgs>(
      args?: Subset<T, PersonalProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonalProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PersonalProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonalProfileAggregateArgs>(args: Subset<T, PersonalProfileAggregateArgs>): Prisma.PrismaPromise<GetPersonalProfileAggregateType<T>>

    /**
     * Group by PersonalProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonalProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonalProfileGroupByArgs['orderBy'] }
        : { orderBy?: PersonalProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonalProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonalProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PersonalProfile model
   */
  readonly fields: PersonalProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PersonalProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonalProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PersonalProfile model
   */
  interface PersonalProfileFieldRefs {
    readonly student_id: FieldRef<"PersonalProfile", 'String'>
    readonly preferred_name: FieldRef<"PersonalProfile", 'String'>
    readonly date_of_birth: FieldRef<"PersonalProfile", 'DateTime'>
    readonly phone: FieldRef<"PersonalProfile", 'String'>
    readonly current_school: FieldRef<"PersonalProfile", 'String'>
    readonly school_location: FieldRef<"PersonalProfile", 'String'>
    readonly parent_name: FieldRef<"PersonalProfile", 'String'>
    readonly parent_email: FieldRef<"PersonalProfile", 'String'>
    readonly parent_phone: FieldRef<"PersonalProfile", 'String'>
    readonly created_at: FieldRef<"PersonalProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PersonalProfile findUnique
   */
  export type PersonalProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * Filter, which PersonalProfile to fetch.
     */
    where: PersonalProfileWhereUniqueInput
  }

  /**
   * PersonalProfile findUniqueOrThrow
   */
  export type PersonalProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * Filter, which PersonalProfile to fetch.
     */
    where: PersonalProfileWhereUniqueInput
  }

  /**
   * PersonalProfile findFirst
   */
  export type PersonalProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * Filter, which PersonalProfile to fetch.
     */
    where?: PersonalProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalProfiles to fetch.
     */
    orderBy?: PersonalProfileOrderByWithRelationInput | PersonalProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalProfiles.
     */
    cursor?: PersonalProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalProfiles.
     */
    distinct?: PersonalProfileScalarFieldEnum | PersonalProfileScalarFieldEnum[]
  }

  /**
   * PersonalProfile findFirstOrThrow
   */
  export type PersonalProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * Filter, which PersonalProfile to fetch.
     */
    where?: PersonalProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalProfiles to fetch.
     */
    orderBy?: PersonalProfileOrderByWithRelationInput | PersonalProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PersonalProfiles.
     */
    cursor?: PersonalProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PersonalProfiles.
     */
    distinct?: PersonalProfileScalarFieldEnum | PersonalProfileScalarFieldEnum[]
  }

  /**
   * PersonalProfile findMany
   */
  export type PersonalProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * Filter, which PersonalProfiles to fetch.
     */
    where?: PersonalProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PersonalProfiles to fetch.
     */
    orderBy?: PersonalProfileOrderByWithRelationInput | PersonalProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PersonalProfiles.
     */
    cursor?: PersonalProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PersonalProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PersonalProfiles.
     */
    skip?: number
    distinct?: PersonalProfileScalarFieldEnum | PersonalProfileScalarFieldEnum[]
  }

  /**
   * PersonalProfile create
   */
  export type PersonalProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a PersonalProfile.
     */
    data: XOR<PersonalProfileCreateInput, PersonalProfileUncheckedCreateInput>
  }

  /**
   * PersonalProfile createMany
   */
  export type PersonalProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PersonalProfiles.
     */
    data: PersonalProfileCreateManyInput | PersonalProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PersonalProfile createManyAndReturn
   */
  export type PersonalProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * The data used to create many PersonalProfiles.
     */
    data: PersonalProfileCreateManyInput | PersonalProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalProfile update
   */
  export type PersonalProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a PersonalProfile.
     */
    data: XOR<PersonalProfileUpdateInput, PersonalProfileUncheckedUpdateInput>
    /**
     * Choose, which PersonalProfile to update.
     */
    where: PersonalProfileWhereUniqueInput
  }

  /**
   * PersonalProfile updateMany
   */
  export type PersonalProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PersonalProfiles.
     */
    data: XOR<PersonalProfileUpdateManyMutationInput, PersonalProfileUncheckedUpdateManyInput>
    /**
     * Filter which PersonalProfiles to update
     */
    where?: PersonalProfileWhereInput
    /**
     * Limit how many PersonalProfiles to update.
     */
    limit?: number
  }

  /**
   * PersonalProfile updateManyAndReturn
   */
  export type PersonalProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * The data used to update PersonalProfiles.
     */
    data: XOR<PersonalProfileUpdateManyMutationInput, PersonalProfileUncheckedUpdateManyInput>
    /**
     * Filter which PersonalProfiles to update
     */
    where?: PersonalProfileWhereInput
    /**
     * Limit how many PersonalProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PersonalProfile upsert
   */
  export type PersonalProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the PersonalProfile to update in case it exists.
     */
    where: PersonalProfileWhereUniqueInput
    /**
     * In case the PersonalProfile found by the `where` argument doesn't exist, create a new PersonalProfile with this data.
     */
    create: XOR<PersonalProfileCreateInput, PersonalProfileUncheckedCreateInput>
    /**
     * In case the PersonalProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonalProfileUpdateInput, PersonalProfileUncheckedUpdateInput>
  }

  /**
   * PersonalProfile delete
   */
  export type PersonalProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
    /**
     * Filter which PersonalProfile to delete.
     */
    where: PersonalProfileWhereUniqueInput
  }

  /**
   * PersonalProfile deleteMany
   */
  export type PersonalProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PersonalProfiles to delete
     */
    where?: PersonalProfileWhereInput
    /**
     * Limit how many PersonalProfiles to delete.
     */
    limit?: number
  }

  /**
   * PersonalProfile without action
   */
  export type PersonalProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonalProfile
     */
    select?: PersonalProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PersonalProfile
     */
    omit?: PersonalProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalProfileInclude<ExtArgs> | null
  }


  /**
   * Model AcademicProfile
   */

  export type AggregateAcademicProfile = {
    _count: AcademicProfileCountAggregateOutputType | null
    _min: AcademicProfileMinAggregateOutputType | null
    _max: AcademicProfileMaxAggregateOutputType | null
  }

  export type AcademicProfileMinAggregateOutputType = {
    student_id: string | null
    curriculum_type: $Enums.CurriculumType | null
    grading_system_type: $Enums.GradingSystemType | null
    current_gpa: string | null
    created_at: Date | null
  }

  export type AcademicProfileMaxAggregateOutputType = {
    student_id: string | null
    curriculum_type: $Enums.CurriculumType | null
    grading_system_type: $Enums.GradingSystemType | null
    current_gpa: string | null
    created_at: Date | null
  }

  export type AcademicProfileCountAggregateOutputType = {
    student_id: number
    curriculum_type: number
    grading_system_type: number
    current_gpa: number
    created_at: number
    _all: number
  }


  export type AcademicProfileMinAggregateInputType = {
    student_id?: true
    curriculum_type?: true
    grading_system_type?: true
    current_gpa?: true
    created_at?: true
  }

  export type AcademicProfileMaxAggregateInputType = {
    student_id?: true
    curriculum_type?: true
    grading_system_type?: true
    current_gpa?: true
    created_at?: true
  }

  export type AcademicProfileCountAggregateInputType = {
    student_id?: true
    curriculum_type?: true
    grading_system_type?: true
    current_gpa?: true
    created_at?: true
    _all?: true
  }

  export type AcademicProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicProfile to aggregate.
     */
    where?: AcademicProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicProfiles to fetch.
     */
    orderBy?: AcademicProfileOrderByWithRelationInput | AcademicProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicProfiles
    **/
    _count?: true | AcademicProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicProfileMaxAggregateInputType
  }

  export type GetAcademicProfileAggregateType<T extends AcademicProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicProfile[P]>
      : GetScalarType<T[P], AggregateAcademicProfile[P]>
  }




  export type AcademicProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicProfileWhereInput
    orderBy?: AcademicProfileOrderByWithAggregationInput | AcademicProfileOrderByWithAggregationInput[]
    by: AcademicProfileScalarFieldEnum[] | AcademicProfileScalarFieldEnum
    having?: AcademicProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicProfileCountAggregateInputType | true
    _min?: AcademicProfileMinAggregateInputType
    _max?: AcademicProfileMaxAggregateInputType
  }

  export type AcademicProfileGroupByOutputType = {
    student_id: string
    curriculum_type: $Enums.CurriculumType
    grading_system_type: $Enums.GradingSystemType
    current_gpa: string | null
    created_at: Date
    _count: AcademicProfileCountAggregateOutputType | null
    _min: AcademicProfileMinAggregateOutputType | null
    _max: AcademicProfileMaxAggregateOutputType | null
  }

  type GetAcademicProfileGroupByPayload<T extends AcademicProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicProfileGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicProfileGroupByOutputType[P]>
        }
      >
    >


  export type AcademicProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_id?: boolean
    curriculum_type?: boolean
    grading_system_type?: boolean
    current_gpa?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicProfile"]>

  export type AcademicProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_id?: boolean
    curriculum_type?: boolean
    grading_system_type?: boolean
    current_gpa?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicProfile"]>

  export type AcademicProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    student_id?: boolean
    curriculum_type?: boolean
    grading_system_type?: boolean
    current_gpa?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicProfile"]>

  export type AcademicProfileSelectScalar = {
    student_id?: boolean
    curriculum_type?: boolean
    grading_system_type?: boolean
    current_gpa?: boolean
    created_at?: boolean
  }

  export type AcademicProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"student_id" | "curriculum_type" | "grading_system_type" | "current_gpa" | "created_at", ExtArgs["result"]["academicProfile"]>
  export type AcademicProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AcademicProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AcademicProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $AcademicProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicProfile"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      student_id: string
      curriculum_type: $Enums.CurriculumType
      grading_system_type: $Enums.GradingSystemType
      current_gpa: string | null
      created_at: Date
    }, ExtArgs["result"]["academicProfile"]>
    composites: {}
  }

  type AcademicProfileGetPayload<S extends boolean | null | undefined | AcademicProfileDefaultArgs> = $Result.GetResult<Prisma.$AcademicProfilePayload, S>

  type AcademicProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicProfileCountAggregateInputType | true
    }

  export interface AcademicProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicProfile'], meta: { name: 'AcademicProfile' } }
    /**
     * Find zero or one AcademicProfile that matches the filter.
     * @param {AcademicProfileFindUniqueArgs} args - Arguments to find a AcademicProfile
     * @example
     * // Get one AcademicProfile
     * const academicProfile = await prisma.academicProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicProfileFindUniqueArgs>(args: SelectSubset<T, AcademicProfileFindUniqueArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicProfileFindUniqueOrThrowArgs} args - Arguments to find a AcademicProfile
     * @example
     * // Get one AcademicProfile
     * const academicProfile = await prisma.academicProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicProfileFindFirstArgs} args - Arguments to find a AcademicProfile
     * @example
     * // Get one AcademicProfile
     * const academicProfile = await prisma.academicProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicProfileFindFirstArgs>(args?: SelectSubset<T, AcademicProfileFindFirstArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicProfileFindFirstOrThrowArgs} args - Arguments to find a AcademicProfile
     * @example
     * // Get one AcademicProfile
     * const academicProfile = await prisma.academicProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicProfiles
     * const academicProfiles = await prisma.academicProfile.findMany()
     * 
     * // Get first 10 AcademicProfiles
     * const academicProfiles = await prisma.academicProfile.findMany({ take: 10 })
     * 
     * // Only select the `student_id`
     * const academicProfileWithStudent_idOnly = await prisma.academicProfile.findMany({ select: { student_id: true } })
     * 
     */
    findMany<T extends AcademicProfileFindManyArgs>(args?: SelectSubset<T, AcademicProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicProfile.
     * @param {AcademicProfileCreateArgs} args - Arguments to create a AcademicProfile.
     * @example
     * // Create one AcademicProfile
     * const AcademicProfile = await prisma.academicProfile.create({
     *   data: {
     *     // ... data to create a AcademicProfile
     *   }
     * })
     * 
     */
    create<T extends AcademicProfileCreateArgs>(args: SelectSubset<T, AcademicProfileCreateArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicProfiles.
     * @param {AcademicProfileCreateManyArgs} args - Arguments to create many AcademicProfiles.
     * @example
     * // Create many AcademicProfiles
     * const academicProfile = await prisma.academicProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicProfileCreateManyArgs>(args?: SelectSubset<T, AcademicProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicProfiles and returns the data saved in the database.
     * @param {AcademicProfileCreateManyAndReturnArgs} args - Arguments to create many AcademicProfiles.
     * @example
     * // Create many AcademicProfiles
     * const academicProfile = await prisma.academicProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicProfiles and only return the `student_id`
     * const academicProfileWithStudent_idOnly = await prisma.academicProfile.createManyAndReturn({
     *   select: { student_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AcademicProfile.
     * @param {AcademicProfileDeleteArgs} args - Arguments to delete one AcademicProfile.
     * @example
     * // Delete one AcademicProfile
     * const AcademicProfile = await prisma.academicProfile.delete({
     *   where: {
     *     // ... filter to delete one AcademicProfile
     *   }
     * })
     * 
     */
    delete<T extends AcademicProfileDeleteArgs>(args: SelectSubset<T, AcademicProfileDeleteArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicProfile.
     * @param {AcademicProfileUpdateArgs} args - Arguments to update one AcademicProfile.
     * @example
     * // Update one AcademicProfile
     * const academicProfile = await prisma.academicProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicProfileUpdateArgs>(args: SelectSubset<T, AcademicProfileUpdateArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicProfiles.
     * @param {AcademicProfileDeleteManyArgs} args - Arguments to filter AcademicProfiles to delete.
     * @example
     * // Delete a few AcademicProfiles
     * const { count } = await prisma.academicProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicProfileDeleteManyArgs>(args?: SelectSubset<T, AcademicProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicProfiles
     * const academicProfile = await prisma.academicProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicProfileUpdateManyArgs>(args: SelectSubset<T, AcademicProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicProfiles and returns the data updated in the database.
     * @param {AcademicProfileUpdateManyAndReturnArgs} args - Arguments to update many AcademicProfiles.
     * @example
     * // Update many AcademicProfiles
     * const academicProfile = await prisma.academicProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicProfiles and only return the `student_id`
     * const academicProfileWithStudent_idOnly = await prisma.academicProfile.updateManyAndReturn({
     *   select: { student_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AcademicProfile.
     * @param {AcademicProfileUpsertArgs} args - Arguments to update or create a AcademicProfile.
     * @example
     * // Update or create a AcademicProfile
     * const academicProfile = await prisma.academicProfile.upsert({
     *   create: {
     *     // ... data to create a AcademicProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicProfile we want to update
     *   }
     * })
     */
    upsert<T extends AcademicProfileUpsertArgs>(args: SelectSubset<T, AcademicProfileUpsertArgs<ExtArgs>>): Prisma__AcademicProfileClient<$Result.GetResult<Prisma.$AcademicProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicProfileCountArgs} args - Arguments to filter AcademicProfiles to count.
     * @example
     * // Count the number of AcademicProfiles
     * const count = await prisma.academicProfile.count({
     *   where: {
     *     // ... the filter for the AcademicProfiles we want to count
     *   }
     * })
    **/
    count<T extends AcademicProfileCountArgs>(
      args?: Subset<T, AcademicProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicProfileAggregateArgs>(args: Subset<T, AcademicProfileAggregateArgs>): Prisma.PrismaPromise<GetAcademicProfileAggregateType<T>>

    /**
     * Group by AcademicProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcademicProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicProfileGroupByArgs['orderBy'] }
        : { orderBy?: AcademicProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcademicProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicProfile model
   */
  readonly fields: AcademicProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicProfile model
   */
  interface AcademicProfileFieldRefs {
    readonly student_id: FieldRef<"AcademicProfile", 'String'>
    readonly curriculum_type: FieldRef<"AcademicProfile", 'CurriculumType'>
    readonly grading_system_type: FieldRef<"AcademicProfile", 'GradingSystemType'>
    readonly current_gpa: FieldRef<"AcademicProfile", 'String'>
    readonly created_at: FieldRef<"AcademicProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicProfile findUnique
   */
  export type AcademicProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * Filter, which AcademicProfile to fetch.
     */
    where: AcademicProfileWhereUniqueInput
  }

  /**
   * AcademicProfile findUniqueOrThrow
   */
  export type AcademicProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * Filter, which AcademicProfile to fetch.
     */
    where: AcademicProfileWhereUniqueInput
  }

  /**
   * AcademicProfile findFirst
   */
  export type AcademicProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * Filter, which AcademicProfile to fetch.
     */
    where?: AcademicProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicProfiles to fetch.
     */
    orderBy?: AcademicProfileOrderByWithRelationInput | AcademicProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicProfiles.
     */
    cursor?: AcademicProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicProfiles.
     */
    distinct?: AcademicProfileScalarFieldEnum | AcademicProfileScalarFieldEnum[]
  }

  /**
   * AcademicProfile findFirstOrThrow
   */
  export type AcademicProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * Filter, which AcademicProfile to fetch.
     */
    where?: AcademicProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicProfiles to fetch.
     */
    orderBy?: AcademicProfileOrderByWithRelationInput | AcademicProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicProfiles.
     */
    cursor?: AcademicProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicProfiles.
     */
    distinct?: AcademicProfileScalarFieldEnum | AcademicProfileScalarFieldEnum[]
  }

  /**
   * AcademicProfile findMany
   */
  export type AcademicProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * Filter, which AcademicProfiles to fetch.
     */
    where?: AcademicProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicProfiles to fetch.
     */
    orderBy?: AcademicProfileOrderByWithRelationInput | AcademicProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicProfiles.
     */
    cursor?: AcademicProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicProfiles.
     */
    skip?: number
    distinct?: AcademicProfileScalarFieldEnum | AcademicProfileScalarFieldEnum[]
  }

  /**
   * AcademicProfile create
   */
  export type AcademicProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicProfile.
     */
    data: XOR<AcademicProfileCreateInput, AcademicProfileUncheckedCreateInput>
  }

  /**
   * AcademicProfile createMany
   */
  export type AcademicProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicProfiles.
     */
    data: AcademicProfileCreateManyInput | AcademicProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicProfile createManyAndReturn
   */
  export type AcademicProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicProfiles.
     */
    data: AcademicProfileCreateManyInput | AcademicProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicProfile update
   */
  export type AcademicProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicProfile.
     */
    data: XOR<AcademicProfileUpdateInput, AcademicProfileUncheckedUpdateInput>
    /**
     * Choose, which AcademicProfile to update.
     */
    where: AcademicProfileWhereUniqueInput
  }

  /**
   * AcademicProfile updateMany
   */
  export type AcademicProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicProfiles.
     */
    data: XOR<AcademicProfileUpdateManyMutationInput, AcademicProfileUncheckedUpdateManyInput>
    /**
     * Filter which AcademicProfiles to update
     */
    where?: AcademicProfileWhereInput
    /**
     * Limit how many AcademicProfiles to update.
     */
    limit?: number
  }

  /**
   * AcademicProfile updateManyAndReturn
   */
  export type AcademicProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * The data used to update AcademicProfiles.
     */
    data: XOR<AcademicProfileUpdateManyMutationInput, AcademicProfileUncheckedUpdateManyInput>
    /**
     * Filter which AcademicProfiles to update
     */
    where?: AcademicProfileWhereInput
    /**
     * Limit how many AcademicProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AcademicProfile upsert
   */
  export type AcademicProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicProfile to update in case it exists.
     */
    where: AcademicProfileWhereUniqueInput
    /**
     * In case the AcademicProfile found by the `where` argument doesn't exist, create a new AcademicProfile with this data.
     */
    create: XOR<AcademicProfileCreateInput, AcademicProfileUncheckedCreateInput>
    /**
     * In case the AcademicProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicProfileUpdateInput, AcademicProfileUncheckedUpdateInput>
  }

  /**
   * AcademicProfile delete
   */
  export type AcademicProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
    /**
     * Filter which AcademicProfile to delete.
     */
    where: AcademicProfileWhereUniqueInput
  }

  /**
   * AcademicProfile deleteMany
   */
  export type AcademicProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicProfiles to delete
     */
    where?: AcademicProfileWhereInput
    /**
     * Limit how many AcademicProfiles to delete.
     */
    limit?: number
  }

  /**
   * AcademicProfile without action
   */
  export type AcademicProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicProfile
     */
    select?: AcademicProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicProfile
     */
    omit?: AcademicProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicProfileInclude<ExtArgs> | null
  }


  /**
   * Model Transcript
   */

  export type AggregateTranscript = {
    _count: TranscriptCountAggregateOutputType | null
    _avg: TranscriptAvgAggregateOutputType | null
    _sum: TranscriptSumAggregateOutputType | null
    _min: TranscriptMinAggregateOutputType | null
    _max: TranscriptMaxAggregateOutputType | null
  }

  export type TranscriptAvgAggregateOutputType = {
    credits: number | null
  }

  export type TranscriptSumAggregateOutputType = {
    credits: number | null
  }

  export type TranscriptMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    course_name: string | null
    grade_level: $Enums.GradeLevel | null
    semester: $Enums.Semester | null
    grade_value: string | null
    credits: number | null
    honors_level: $Enums.HonorsLevel | null
    is_board_exam: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TranscriptMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    course_name: string | null
    grade_level: $Enums.GradeLevel | null
    semester: $Enums.Semester | null
    grade_value: string | null
    credits: number | null
    honors_level: $Enums.HonorsLevel | null
    is_board_exam: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TranscriptCountAggregateOutputType = {
    id: number
    student_id: number
    course_name: number
    grade_level: number
    semester: number
    grade_value: number
    credits: number
    honors_level: number
    is_board_exam: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TranscriptAvgAggregateInputType = {
    credits?: true
  }

  export type TranscriptSumAggregateInputType = {
    credits?: true
  }

  export type TranscriptMinAggregateInputType = {
    id?: true
    student_id?: true
    course_name?: true
    grade_level?: true
    semester?: true
    grade_value?: true
    credits?: true
    honors_level?: true
    is_board_exam?: true
    created_at?: true
    updated_at?: true
  }

  export type TranscriptMaxAggregateInputType = {
    id?: true
    student_id?: true
    course_name?: true
    grade_level?: true
    semester?: true
    grade_value?: true
    credits?: true
    honors_level?: true
    is_board_exam?: true
    created_at?: true
    updated_at?: true
  }

  export type TranscriptCountAggregateInputType = {
    id?: true
    student_id?: true
    course_name?: true
    grade_level?: true
    semester?: true
    grade_value?: true
    credits?: true
    honors_level?: true
    is_board_exam?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TranscriptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transcript to aggregate.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transcripts
    **/
    _count?: true | TranscriptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TranscriptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TranscriptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TranscriptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TranscriptMaxAggregateInputType
  }

  export type GetTranscriptAggregateType<T extends TranscriptAggregateArgs> = {
        [P in keyof T & keyof AggregateTranscript]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTranscript[P]>
      : GetScalarType<T[P], AggregateTranscript[P]>
  }




  export type TranscriptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TranscriptWhereInput
    orderBy?: TranscriptOrderByWithAggregationInput | TranscriptOrderByWithAggregationInput[]
    by: TranscriptScalarFieldEnum[] | TranscriptScalarFieldEnum
    having?: TranscriptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TranscriptCountAggregateInputType | true
    _avg?: TranscriptAvgAggregateInputType
    _sum?: TranscriptSumAggregateInputType
    _min?: TranscriptMinAggregateInputType
    _max?: TranscriptMaxAggregateInputType
  }

  export type TranscriptGroupByOutputType = {
    id: string
    student_id: string
    course_name: string
    grade_level: $Enums.GradeLevel
    semester: $Enums.Semester
    grade_value: string
    credits: number | null
    honors_level: $Enums.HonorsLevel
    is_board_exam: boolean
    created_at: Date
    updated_at: Date
    _count: TranscriptCountAggregateOutputType | null
    _avg: TranscriptAvgAggregateOutputType | null
    _sum: TranscriptSumAggregateOutputType | null
    _min: TranscriptMinAggregateOutputType | null
    _max: TranscriptMaxAggregateOutputType | null
  }

  type GetTranscriptGroupByPayload<T extends TranscriptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TranscriptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TranscriptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TranscriptGroupByOutputType[P]>
            : GetScalarType<T[P], TranscriptGroupByOutputType[P]>
        }
      >
    >


  export type TranscriptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    course_name?: boolean
    grade_level?: boolean
    semester?: boolean
    grade_value?: boolean
    credits?: boolean
    honors_level?: boolean
    is_board_exam?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcript"]>

  export type TranscriptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    course_name?: boolean
    grade_level?: boolean
    semester?: boolean
    grade_value?: boolean
    credits?: boolean
    honors_level?: boolean
    is_board_exam?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcript"]>

  export type TranscriptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    course_name?: boolean
    grade_level?: boolean
    semester?: boolean
    grade_value?: boolean
    credits?: boolean
    honors_level?: boolean
    is_board_exam?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transcript"]>

  export type TranscriptSelectScalar = {
    id?: boolean
    student_id?: boolean
    course_name?: boolean
    grade_level?: boolean
    semester?: boolean
    grade_value?: boolean
    credits?: boolean
    honors_level?: boolean
    is_board_exam?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TranscriptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "course_name" | "grade_level" | "semester" | "grade_value" | "credits" | "honors_level" | "is_board_exam" | "created_at" | "updated_at", ExtArgs["result"]["transcript"]>
  export type TranscriptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TranscriptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TranscriptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $TranscriptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transcript"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string
      course_name: string
      grade_level: $Enums.GradeLevel
      semester: $Enums.Semester
      grade_value: string
      credits: number | null
      honors_level: $Enums.HonorsLevel
      is_board_exam: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["transcript"]>
    composites: {}
  }

  type TranscriptGetPayload<S extends boolean | null | undefined | TranscriptDefaultArgs> = $Result.GetResult<Prisma.$TranscriptPayload, S>

  type TranscriptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TranscriptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TranscriptCountAggregateInputType | true
    }

  export interface TranscriptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transcript'], meta: { name: 'Transcript' } }
    /**
     * Find zero or one Transcript that matches the filter.
     * @param {TranscriptFindUniqueArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TranscriptFindUniqueArgs>(args: SelectSubset<T, TranscriptFindUniqueArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transcript that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TranscriptFindUniqueOrThrowArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TranscriptFindUniqueOrThrowArgs>(args: SelectSubset<T, TranscriptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transcript that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptFindFirstArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TranscriptFindFirstArgs>(args?: SelectSubset<T, TranscriptFindFirstArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transcript that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptFindFirstOrThrowArgs} args - Arguments to find a Transcript
     * @example
     * // Get one Transcript
     * const transcript = await prisma.transcript.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TranscriptFindFirstOrThrowArgs>(args?: SelectSubset<T, TranscriptFindFirstOrThrowArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transcripts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transcripts
     * const transcripts = await prisma.transcript.findMany()
     * 
     * // Get first 10 Transcripts
     * const transcripts = await prisma.transcript.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transcriptWithIdOnly = await prisma.transcript.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TranscriptFindManyArgs>(args?: SelectSubset<T, TranscriptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transcript.
     * @param {TranscriptCreateArgs} args - Arguments to create a Transcript.
     * @example
     * // Create one Transcript
     * const Transcript = await prisma.transcript.create({
     *   data: {
     *     // ... data to create a Transcript
     *   }
     * })
     * 
     */
    create<T extends TranscriptCreateArgs>(args: SelectSubset<T, TranscriptCreateArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transcripts.
     * @param {TranscriptCreateManyArgs} args - Arguments to create many Transcripts.
     * @example
     * // Create many Transcripts
     * const transcript = await prisma.transcript.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TranscriptCreateManyArgs>(args?: SelectSubset<T, TranscriptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transcripts and returns the data saved in the database.
     * @param {TranscriptCreateManyAndReturnArgs} args - Arguments to create many Transcripts.
     * @example
     * // Create many Transcripts
     * const transcript = await prisma.transcript.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transcripts and only return the `id`
     * const transcriptWithIdOnly = await prisma.transcript.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TranscriptCreateManyAndReturnArgs>(args?: SelectSubset<T, TranscriptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transcript.
     * @param {TranscriptDeleteArgs} args - Arguments to delete one Transcript.
     * @example
     * // Delete one Transcript
     * const Transcript = await prisma.transcript.delete({
     *   where: {
     *     // ... filter to delete one Transcript
     *   }
     * })
     * 
     */
    delete<T extends TranscriptDeleteArgs>(args: SelectSubset<T, TranscriptDeleteArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transcript.
     * @param {TranscriptUpdateArgs} args - Arguments to update one Transcript.
     * @example
     * // Update one Transcript
     * const transcript = await prisma.transcript.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TranscriptUpdateArgs>(args: SelectSubset<T, TranscriptUpdateArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transcripts.
     * @param {TranscriptDeleteManyArgs} args - Arguments to filter Transcripts to delete.
     * @example
     * // Delete a few Transcripts
     * const { count } = await prisma.transcript.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TranscriptDeleteManyArgs>(args?: SelectSubset<T, TranscriptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transcripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transcripts
     * const transcript = await prisma.transcript.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TranscriptUpdateManyArgs>(args: SelectSubset<T, TranscriptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transcripts and returns the data updated in the database.
     * @param {TranscriptUpdateManyAndReturnArgs} args - Arguments to update many Transcripts.
     * @example
     * // Update many Transcripts
     * const transcript = await prisma.transcript.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transcripts and only return the `id`
     * const transcriptWithIdOnly = await prisma.transcript.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TranscriptUpdateManyAndReturnArgs>(args: SelectSubset<T, TranscriptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transcript.
     * @param {TranscriptUpsertArgs} args - Arguments to update or create a Transcript.
     * @example
     * // Update or create a Transcript
     * const transcript = await prisma.transcript.upsert({
     *   create: {
     *     // ... data to create a Transcript
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transcript we want to update
     *   }
     * })
     */
    upsert<T extends TranscriptUpsertArgs>(args: SelectSubset<T, TranscriptUpsertArgs<ExtArgs>>): Prisma__TranscriptClient<$Result.GetResult<Prisma.$TranscriptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transcripts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptCountArgs} args - Arguments to filter Transcripts to count.
     * @example
     * // Count the number of Transcripts
     * const count = await prisma.transcript.count({
     *   where: {
     *     // ... the filter for the Transcripts we want to count
     *   }
     * })
    **/
    count<T extends TranscriptCountArgs>(
      args?: Subset<T, TranscriptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TranscriptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transcript.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TranscriptAggregateArgs>(args: Subset<T, TranscriptAggregateArgs>): Prisma.PrismaPromise<GetTranscriptAggregateType<T>>

    /**
     * Group by Transcript.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TranscriptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TranscriptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TranscriptGroupByArgs['orderBy'] }
        : { orderBy?: TranscriptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TranscriptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTranscriptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transcript model
   */
  readonly fields: TranscriptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transcript.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TranscriptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transcript model
   */
  interface TranscriptFieldRefs {
    readonly id: FieldRef<"Transcript", 'String'>
    readonly student_id: FieldRef<"Transcript", 'String'>
    readonly course_name: FieldRef<"Transcript", 'String'>
    readonly grade_level: FieldRef<"Transcript", 'GradeLevel'>
    readonly semester: FieldRef<"Transcript", 'Semester'>
    readonly grade_value: FieldRef<"Transcript", 'String'>
    readonly credits: FieldRef<"Transcript", 'Float'>
    readonly honors_level: FieldRef<"Transcript", 'HonorsLevel'>
    readonly is_board_exam: FieldRef<"Transcript", 'Boolean'>
    readonly created_at: FieldRef<"Transcript", 'DateTime'>
    readonly updated_at: FieldRef<"Transcript", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transcript findUnique
   */
  export type TranscriptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript findUniqueOrThrow
   */
  export type TranscriptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript findFirst
   */
  export type TranscriptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transcripts.
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transcripts.
     */
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Transcript findFirstOrThrow
   */
  export type TranscriptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcript to fetch.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transcripts.
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transcripts.
     */
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Transcript findMany
   */
  export type TranscriptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter, which Transcripts to fetch.
     */
    where?: TranscriptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transcripts to fetch.
     */
    orderBy?: TranscriptOrderByWithRelationInput | TranscriptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transcripts.
     */
    cursor?: TranscriptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transcripts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transcripts.
     */
    skip?: number
    distinct?: TranscriptScalarFieldEnum | TranscriptScalarFieldEnum[]
  }

  /**
   * Transcript create
   */
  export type TranscriptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * The data needed to create a Transcript.
     */
    data: XOR<TranscriptCreateInput, TranscriptUncheckedCreateInput>
  }

  /**
   * Transcript createMany
   */
  export type TranscriptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transcripts.
     */
    data: TranscriptCreateManyInput | TranscriptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transcript createManyAndReturn
   */
  export type TranscriptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * The data used to create many Transcripts.
     */
    data: TranscriptCreateManyInput | TranscriptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transcript update
   */
  export type TranscriptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * The data needed to update a Transcript.
     */
    data: XOR<TranscriptUpdateInput, TranscriptUncheckedUpdateInput>
    /**
     * Choose, which Transcript to update.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript updateMany
   */
  export type TranscriptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transcripts.
     */
    data: XOR<TranscriptUpdateManyMutationInput, TranscriptUncheckedUpdateManyInput>
    /**
     * Filter which Transcripts to update
     */
    where?: TranscriptWhereInput
    /**
     * Limit how many Transcripts to update.
     */
    limit?: number
  }

  /**
   * Transcript updateManyAndReturn
   */
  export type TranscriptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * The data used to update Transcripts.
     */
    data: XOR<TranscriptUpdateManyMutationInput, TranscriptUncheckedUpdateManyInput>
    /**
     * Filter which Transcripts to update
     */
    where?: TranscriptWhereInput
    /**
     * Limit how many Transcripts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transcript upsert
   */
  export type TranscriptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * The filter to search for the Transcript to update in case it exists.
     */
    where: TranscriptWhereUniqueInput
    /**
     * In case the Transcript found by the `where` argument doesn't exist, create a new Transcript with this data.
     */
    create: XOR<TranscriptCreateInput, TranscriptUncheckedCreateInput>
    /**
     * In case the Transcript was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TranscriptUpdateInput, TranscriptUncheckedUpdateInput>
  }

  /**
   * Transcript delete
   */
  export type TranscriptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
    /**
     * Filter which Transcript to delete.
     */
    where: TranscriptWhereUniqueInput
  }

  /**
   * Transcript deleteMany
   */
  export type TranscriptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transcripts to delete
     */
    where?: TranscriptWhereInput
    /**
     * Limit how many Transcripts to delete.
     */
    limit?: number
  }

  /**
   * Transcript without action
   */
  export type TranscriptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transcript
     */
    select?: TranscriptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transcript
     */
    omit?: TranscriptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TranscriptInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    hours_per_week: number | null
    weeks_per_year: number | null
  }

  export type ActivitySumAggregateOutputType = {
    hours_per_week: number | null
    weeks_per_year: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    activity_name: string | null
    category: string | null
    role: string | null
    hours_per_week: number | null
    weeks_per_year: number | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    activity_name: string | null
    category: string | null
    role: string | null
    hours_per_week: number | null
    weeks_per_year: number | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    student_id: number
    activity_name: number
    category: number
    role: number
    grade_levels: number
    hours_per_week: number
    weeks_per_year: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    hours_per_week?: true
    weeks_per_year?: true
  }

  export type ActivitySumAggregateInputType = {
    hours_per_week?: true
    weeks_per_year?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    student_id?: true
    activity_name?: true
    category?: true
    role?: true
    hours_per_week?: true
    weeks_per_year?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    student_id?: true
    activity_name?: true
    category?: true
    role?: true
    hours_per_week?: true
    weeks_per_year?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    student_id?: true
    activity_name?: true
    category?: true
    role?: true
    grade_levels?: true
    hours_per_week?: true
    weeks_per_year?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    student_id: string
    activity_name: string
    category: string
    role: string | null
    grade_levels: JsonValue
    hours_per_week: number
    weeks_per_year: number
    description: string | null
    created_at: Date
    updated_at: Date
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    activity_name?: boolean
    category?: boolean
    role?: boolean
    grade_levels?: boolean
    hours_per_week?: boolean
    weeks_per_year?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    activity_name?: boolean
    category?: boolean
    role?: boolean
    grade_levels?: boolean
    hours_per_week?: boolean
    weeks_per_year?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    activity_name?: boolean
    category?: boolean
    role?: boolean
    grade_levels?: boolean
    hours_per_week?: boolean
    weeks_per_year?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    student_id?: boolean
    activity_name?: boolean
    category?: boolean
    role?: boolean
    grade_levels?: boolean
    hours_per_week?: boolean
    weeks_per_year?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "activity_name" | "category" | "role" | "grade_levels" | "hours_per_week" | "weeks_per_year" | "description" | "created_at" | "updated_at", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string
      activity_name: string
      category: string
      role: string | null
      grade_levels: Prisma.JsonValue
      hours_per_week: number
      weeks_per_year: number
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly student_id: FieldRef<"Activity", 'String'>
    readonly activity_name: FieldRef<"Activity", 'String'>
    readonly category: FieldRef<"Activity", 'String'>
    readonly role: FieldRef<"Activity", 'String'>
    readonly grade_levels: FieldRef<"Activity", 'Json'>
    readonly hours_per_week: FieldRef<"Activity", 'Int'>
    readonly weeks_per_year: FieldRef<"Activity", 'Int'>
    readonly description: FieldRef<"Activity", 'String'>
    readonly created_at: FieldRef<"Activity", 'DateTime'>
    readonly updated_at: FieldRef<"Activity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model TestScore
   */

  export type AggregateTestScore = {
    _count: TestScoreCountAggregateOutputType | null
    _avg: TestScoreAvgAggregateOutputType | null
    _sum: TestScoreSumAggregateOutputType | null
    _min: TestScoreMinAggregateOutputType | null
    _max: TestScoreMaxAggregateOutputType | null
  }

  export type TestScoreAvgAggregateOutputType = {
    composite_score: number | null
  }

  export type TestScoreSumAggregateOutputType = {
    composite_score: number | null
  }

  export type TestScoreMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    test_type: string | null
    test_name: string | null
    test_date: Date | null
    composite_score: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TestScoreMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    test_type: string | null
    test_name: string | null
    test_date: Date | null
    composite_score: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TestScoreCountAggregateOutputType = {
    id: number
    student_id: number
    test_type: number
    test_name: number
    test_date: number
    composite_score: number
    section_scores: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TestScoreAvgAggregateInputType = {
    composite_score?: true
  }

  export type TestScoreSumAggregateInputType = {
    composite_score?: true
  }

  export type TestScoreMinAggregateInputType = {
    id?: true
    student_id?: true
    test_type?: true
    test_name?: true
    test_date?: true
    composite_score?: true
    created_at?: true
    updated_at?: true
  }

  export type TestScoreMaxAggregateInputType = {
    id?: true
    student_id?: true
    test_type?: true
    test_name?: true
    test_date?: true
    composite_score?: true
    created_at?: true
    updated_at?: true
  }

  export type TestScoreCountAggregateInputType = {
    id?: true
    student_id?: true
    test_type?: true
    test_name?: true
    test_date?: true
    composite_score?: true
    section_scores?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TestScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestScore to aggregate.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestScores
    **/
    _count?: true | TestScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestScoreMaxAggregateInputType
  }

  export type GetTestScoreAggregateType<T extends TestScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateTestScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestScore[P]>
      : GetScalarType<T[P], AggregateTestScore[P]>
  }




  export type TestScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestScoreWhereInput
    orderBy?: TestScoreOrderByWithAggregationInput | TestScoreOrderByWithAggregationInput[]
    by: TestScoreScalarFieldEnum[] | TestScoreScalarFieldEnum
    having?: TestScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestScoreCountAggregateInputType | true
    _avg?: TestScoreAvgAggregateInputType
    _sum?: TestScoreSumAggregateInputType
    _min?: TestScoreMinAggregateInputType
    _max?: TestScoreMaxAggregateInputType
  }

  export type TestScoreGroupByOutputType = {
    id: string
    student_id: string
    test_type: string
    test_name: string
    test_date: Date
    composite_score: number | null
    section_scores: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: TestScoreCountAggregateOutputType | null
    _avg: TestScoreAvgAggregateOutputType | null
    _sum: TestScoreSumAggregateOutputType | null
    _min: TestScoreMinAggregateOutputType | null
    _max: TestScoreMaxAggregateOutputType | null
  }

  type GetTestScoreGroupByPayload<T extends TestScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestScoreGroupByOutputType[P]>
            : GetScalarType<T[P], TestScoreGroupByOutputType[P]>
        }
      >
    >


  export type TestScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    test_type?: boolean
    test_name?: boolean
    test_date?: boolean
    composite_score?: boolean
    section_scores?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    test_type?: boolean
    test_name?: boolean
    test_date?: boolean
    composite_score?: boolean
    section_scores?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    test_type?: boolean
    test_name?: boolean
    test_date?: boolean
    composite_score?: boolean
    section_scores?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testScore"]>

  export type TestScoreSelectScalar = {
    id?: boolean
    student_id?: boolean
    test_type?: boolean
    test_name?: boolean
    test_date?: boolean
    composite_score?: boolean
    section_scores?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TestScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "test_type" | "test_name" | "test_date" | "composite_score" | "section_scores" | "created_at" | "updated_at", ExtArgs["result"]["testScore"]>
  export type TestScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TestScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TestScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $TestScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestScore"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string
      test_type: string
      test_name: string
      test_date: Date
      composite_score: number | null
      section_scores: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["testScore"]>
    composites: {}
  }

  type TestScoreGetPayload<S extends boolean | null | undefined | TestScoreDefaultArgs> = $Result.GetResult<Prisma.$TestScorePayload, S>

  type TestScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestScoreCountAggregateInputType | true
    }

  export interface TestScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestScore'], meta: { name: 'TestScore' } }
    /**
     * Find zero or one TestScore that matches the filter.
     * @param {TestScoreFindUniqueArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestScoreFindUniqueArgs>(args: SelectSubset<T, TestScoreFindUniqueArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestScoreFindUniqueOrThrowArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, TestScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindFirstArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestScoreFindFirstArgs>(args?: SelectSubset<T, TestScoreFindFirstArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindFirstOrThrowArgs} args - Arguments to find a TestScore
     * @example
     * // Get one TestScore
     * const testScore = await prisma.testScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, TestScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestScores
     * const testScores = await prisma.testScore.findMany()
     * 
     * // Get first 10 TestScores
     * const testScores = await prisma.testScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testScoreWithIdOnly = await prisma.testScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestScoreFindManyArgs>(args?: SelectSubset<T, TestScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestScore.
     * @param {TestScoreCreateArgs} args - Arguments to create a TestScore.
     * @example
     * // Create one TestScore
     * const TestScore = await prisma.testScore.create({
     *   data: {
     *     // ... data to create a TestScore
     *   }
     * })
     * 
     */
    create<T extends TestScoreCreateArgs>(args: SelectSubset<T, TestScoreCreateArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestScores.
     * @param {TestScoreCreateManyArgs} args - Arguments to create many TestScores.
     * @example
     * // Create many TestScores
     * const testScore = await prisma.testScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestScoreCreateManyArgs>(args?: SelectSubset<T, TestScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestScores and returns the data saved in the database.
     * @param {TestScoreCreateManyAndReturnArgs} args - Arguments to create many TestScores.
     * @example
     * // Create many TestScores
     * const testScore = await prisma.testScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestScores and only return the `id`
     * const testScoreWithIdOnly = await prisma.testScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, TestScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestScore.
     * @param {TestScoreDeleteArgs} args - Arguments to delete one TestScore.
     * @example
     * // Delete one TestScore
     * const TestScore = await prisma.testScore.delete({
     *   where: {
     *     // ... filter to delete one TestScore
     *   }
     * })
     * 
     */
    delete<T extends TestScoreDeleteArgs>(args: SelectSubset<T, TestScoreDeleteArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestScore.
     * @param {TestScoreUpdateArgs} args - Arguments to update one TestScore.
     * @example
     * // Update one TestScore
     * const testScore = await prisma.testScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestScoreUpdateArgs>(args: SelectSubset<T, TestScoreUpdateArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestScores.
     * @param {TestScoreDeleteManyArgs} args - Arguments to filter TestScores to delete.
     * @example
     * // Delete a few TestScores
     * const { count } = await prisma.testScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestScoreDeleteManyArgs>(args?: SelectSubset<T, TestScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestScores
     * const testScore = await prisma.testScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestScoreUpdateManyArgs>(args: SelectSubset<T, TestScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestScores and returns the data updated in the database.
     * @param {TestScoreUpdateManyAndReturnArgs} args - Arguments to update many TestScores.
     * @example
     * // Update many TestScores
     * const testScore = await prisma.testScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestScores and only return the `id`
     * const testScoreWithIdOnly = await prisma.testScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, TestScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestScore.
     * @param {TestScoreUpsertArgs} args - Arguments to update or create a TestScore.
     * @example
     * // Update or create a TestScore
     * const testScore = await prisma.testScore.upsert({
     *   create: {
     *     // ... data to create a TestScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestScore we want to update
     *   }
     * })
     */
    upsert<T extends TestScoreUpsertArgs>(args: SelectSubset<T, TestScoreUpsertArgs<ExtArgs>>): Prisma__TestScoreClient<$Result.GetResult<Prisma.$TestScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreCountArgs} args - Arguments to filter TestScores to count.
     * @example
     * // Count the number of TestScores
     * const count = await prisma.testScore.count({
     *   where: {
     *     // ... the filter for the TestScores we want to count
     *   }
     * })
    **/
    count<T extends TestScoreCountArgs>(
      args?: Subset<T, TestScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestScoreAggregateArgs>(args: Subset<T, TestScoreAggregateArgs>): Prisma.PrismaPromise<GetTestScoreAggregateType<T>>

    /**
     * Group by TestScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestScoreGroupByArgs['orderBy'] }
        : { orderBy?: TestScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestScore model
   */
  readonly fields: TestScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestScore model
   */
  interface TestScoreFieldRefs {
    readonly id: FieldRef<"TestScore", 'String'>
    readonly student_id: FieldRef<"TestScore", 'String'>
    readonly test_type: FieldRef<"TestScore", 'String'>
    readonly test_name: FieldRef<"TestScore", 'String'>
    readonly test_date: FieldRef<"TestScore", 'DateTime'>
    readonly composite_score: FieldRef<"TestScore", 'Int'>
    readonly section_scores: FieldRef<"TestScore", 'Json'>
    readonly created_at: FieldRef<"TestScore", 'DateTime'>
    readonly updated_at: FieldRef<"TestScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestScore findUnique
   */
  export type TestScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore findUniqueOrThrow
   */
  export type TestScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore findFirst
   */
  export type TestScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestScores.
     */
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore findFirstOrThrow
   */
  export type TestScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScore to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestScores.
     */
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore findMany
   */
  export type TestScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter, which TestScores to fetch.
     */
    where?: TestScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestScores to fetch.
     */
    orderBy?: TestScoreOrderByWithRelationInput | TestScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestScores.
     */
    cursor?: TestScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestScores.
     */
    skip?: number
    distinct?: TestScoreScalarFieldEnum | TestScoreScalarFieldEnum[]
  }

  /**
   * TestScore create
   */
  export type TestScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a TestScore.
     */
    data: XOR<TestScoreCreateInput, TestScoreUncheckedCreateInput>
  }

  /**
   * TestScore createMany
   */
  export type TestScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestScores.
     */
    data: TestScoreCreateManyInput | TestScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestScore createManyAndReturn
   */
  export type TestScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * The data used to create many TestScores.
     */
    data: TestScoreCreateManyInput | TestScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestScore update
   */
  export type TestScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a TestScore.
     */
    data: XOR<TestScoreUpdateInput, TestScoreUncheckedUpdateInput>
    /**
     * Choose, which TestScore to update.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore updateMany
   */
  export type TestScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestScores.
     */
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyInput>
    /**
     * Filter which TestScores to update
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to update.
     */
    limit?: number
  }

  /**
   * TestScore updateManyAndReturn
   */
  export type TestScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * The data used to update TestScores.
     */
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyInput>
    /**
     * Filter which TestScores to update
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestScore upsert
   */
  export type TestScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the TestScore to update in case it exists.
     */
    where: TestScoreWhereUniqueInput
    /**
     * In case the TestScore found by the `where` argument doesn't exist, create a new TestScore with this data.
     */
    create: XOR<TestScoreCreateInput, TestScoreUncheckedCreateInput>
    /**
     * In case the TestScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestScoreUpdateInput, TestScoreUncheckedUpdateInput>
  }

  /**
   * TestScore delete
   */
  export type TestScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
    /**
     * Filter which TestScore to delete.
     */
    where: TestScoreWhereUniqueInput
  }

  /**
   * TestScore deleteMany
   */
  export type TestScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestScores to delete
     */
    where?: TestScoreWhereInput
    /**
     * Limit how many TestScores to delete.
     */
    limit?: number
  }

  /**
   * TestScore without action
   */
  export type TestScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestScore
     */
    select?: TestScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestScore
     */
    omit?: TestScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestScoreInclude<ExtArgs> | null
  }


  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    achievement_type: $Enums.AchievementType | null
    title: string | null
    organization: string | null
    grade_level: $Enums.GradeLevel | null
    date_achieved: Date | null
    description: string | null
    metrics: string | null
    recognition_level: $Enums.RecognitionLevel | null
    verifiable_link: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    achievement_type: $Enums.AchievementType | null
    title: string | null
    organization: string | null
    grade_level: $Enums.GradeLevel | null
    date_achieved: Date | null
    description: string | null
    metrics: string | null
    recognition_level: $Enums.RecognitionLevel | null
    verifiable_link: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    student_id: number
    achievement_type: number
    title: number
    organization: number
    grade_level: number
    date_achieved: number
    description: number
    metrics: number
    recognition_level: number
    verifiable_link: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AchievementMinAggregateInputType = {
    id?: true
    student_id?: true
    achievement_type?: true
    title?: true
    organization?: true
    grade_level?: true
    date_achieved?: true
    description?: true
    metrics?: true
    recognition_level?: true
    verifiable_link?: true
    created_at?: true
    updated_at?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    student_id?: true
    achievement_type?: true
    title?: true
    organization?: true
    grade_level?: true
    date_achieved?: true
    description?: true
    metrics?: true
    recognition_level?: true
    verifiable_link?: true
    created_at?: true
    updated_at?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    student_id?: true
    achievement_type?: true
    title?: true
    organization?: true
    grade_level?: true
    date_achieved?: true
    description?: true
    metrics?: true
    recognition_level?: true
    verifiable_link?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithAggregationInput | AchievementOrderByWithAggregationInput[]
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }

  export type AchievementGroupByOutputType = {
    id: string
    student_id: string
    achievement_type: $Enums.AchievementType
    title: string
    organization: string | null
    grade_level: $Enums.GradeLevel | null
    date_achieved: Date | null
    description: string | null
    metrics: string | null
    recognition_level: $Enums.RecognitionLevel | null
    verifiable_link: string | null
    created_at: Date
    updated_at: Date
    _count: AchievementCountAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    achievement_type?: boolean
    title?: boolean
    organization?: boolean
    grade_level?: boolean
    date_achieved?: boolean
    description?: boolean
    metrics?: boolean
    recognition_level?: boolean
    verifiable_link?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    achievement_type?: boolean
    title?: boolean
    organization?: boolean
    grade_level?: boolean
    date_achieved?: boolean
    description?: boolean
    metrics?: boolean
    recognition_level?: boolean
    verifiable_link?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    achievement_type?: boolean
    title?: boolean
    organization?: boolean
    grade_level?: boolean
    date_achieved?: boolean
    description?: boolean
    metrics?: boolean
    recognition_level?: boolean
    verifiable_link?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectScalar = {
    id?: boolean
    student_id?: boolean
    achievement_type?: boolean
    title?: boolean
    organization?: boolean
    grade_level?: boolean
    date_achieved?: boolean
    description?: boolean
    metrics?: boolean
    recognition_level?: boolean
    verifiable_link?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AchievementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "achievement_type" | "title" | "organization" | "grade_level" | "date_achieved" | "description" | "metrics" | "recognition_level" | "verifiable_link" | "created_at" | "updated_at", ExtArgs["result"]["achievement"]>
  export type AchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AchievementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $AchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Achievement"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string
      achievement_type: $Enums.AchievementType
      title: string
      organization: string | null
      grade_level: $Enums.GradeLevel | null
      date_achieved: Date | null
      description: string | null
      metrics: string | null
      recognition_level: $Enums.RecognitionLevel | null
      verifiable_link: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["achievement"]>
    composites: {}
  }

  type AchievementGetPayload<S extends boolean | null | undefined | AchievementDefaultArgs> = $Result.GetResult<Prisma.$AchievementPayload, S>

  type AchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Achievement'], meta: { name: 'Achievement' } }
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AchievementFindUniqueArgs>(args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Achievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AchievementFindFirstArgs>(args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AchievementFindManyArgs>(args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
     */
    create<T extends AchievementCreateArgs>(args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Achievements.
     * @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AchievementCreateManyArgs>(args?: SelectSubset<T, AchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {AchievementCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, AchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
     */
    delete<T extends AchievementDeleteArgs>(args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AchievementUpdateArgs>(args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AchievementDeleteManyArgs>(args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AchievementUpdateManyArgs>(args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements and returns the data updated in the database.
     * @param {AchievementUpdateManyAndReturnArgs} args - Arguments to update many Achievements.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AchievementUpdateManyAndReturnArgs>(args: SelectSubset<T, AchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
     */
    upsert<T extends AchievementUpsertArgs>(args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Achievement model
   */
  readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Achievement model
   */
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", 'String'>
    readonly student_id: FieldRef<"Achievement", 'String'>
    readonly achievement_type: FieldRef<"Achievement", 'AchievementType'>
    readonly title: FieldRef<"Achievement", 'String'>
    readonly organization: FieldRef<"Achievement", 'String'>
    readonly grade_level: FieldRef<"Achievement", 'GradeLevel'>
    readonly date_achieved: FieldRef<"Achievement", 'DateTime'>
    readonly description: FieldRef<"Achievement", 'String'>
    readonly metrics: FieldRef<"Achievement", 'String'>
    readonly recognition_level: FieldRef<"Achievement", 'RecognitionLevel'>
    readonly verifiable_link: FieldRef<"Achievement", 'String'>
    readonly created_at: FieldRef<"Achievement", 'DateTime'>
    readonly updated_at: FieldRef<"Achievement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement create
   */
  export type AchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }

  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement createManyAndReturn
   */
  export type AchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement updateManyAndReturn
   */
  export type AchievementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }

  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to delete.
     */
    limit?: number
  }

  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
  }


  /**
   * Model ProjectExperience
   */

  export type AggregateProjectExperience = {
    _count: ProjectExperienceCountAggregateOutputType | null
    _min: ProjectExperienceMinAggregateOutputType | null
    _max: ProjectExperienceMaxAggregateOutputType | null
  }

  export type ProjectExperienceMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    experience_type: $Enums.ExperienceType | null
    title: string | null
    organization: string | null
    location: string | null
    start_date: Date | null
    end_date: Date | null
    is_ongoing: boolean | null
    role_title: string | null
    description: string | null
    outcomes: string | null
    project_link: string | null
    mentor_name: string | null
    mentor_email: string | null
    status: $Enums.ProjectStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectExperienceMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    experience_type: $Enums.ExperienceType | null
    title: string | null
    organization: string | null
    location: string | null
    start_date: Date | null
    end_date: Date | null
    is_ongoing: boolean | null
    role_title: string | null
    description: string | null
    outcomes: string | null
    project_link: string | null
    mentor_name: string | null
    mentor_email: string | null
    status: $Enums.ProjectStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectExperienceCountAggregateOutputType = {
    id: number
    student_id: number
    experience_type: number
    title: number
    organization: number
    location: number
    start_date: number
    end_date: number
    is_ongoing: number
    role_title: number
    description: number
    outcomes: number
    skills_learned: number
    project_link: number
    mentor_name: number
    mentor_email: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProjectExperienceMinAggregateInputType = {
    id?: true
    student_id?: true
    experience_type?: true
    title?: true
    organization?: true
    location?: true
    start_date?: true
    end_date?: true
    is_ongoing?: true
    role_title?: true
    description?: true
    outcomes?: true
    project_link?: true
    mentor_name?: true
    mentor_email?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectExperienceMaxAggregateInputType = {
    id?: true
    student_id?: true
    experience_type?: true
    title?: true
    organization?: true
    location?: true
    start_date?: true
    end_date?: true
    is_ongoing?: true
    role_title?: true
    description?: true
    outcomes?: true
    project_link?: true
    mentor_name?: true
    mentor_email?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectExperienceCountAggregateInputType = {
    id?: true
    student_id?: true
    experience_type?: true
    title?: true
    organization?: true
    location?: true
    start_date?: true
    end_date?: true
    is_ongoing?: true
    role_title?: true
    description?: true
    outcomes?: true
    skills_learned?: true
    project_link?: true
    mentor_name?: true
    mentor_email?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProjectExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectExperience to aggregate.
     */
    where?: ProjectExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectExperiences to fetch.
     */
    orderBy?: ProjectExperienceOrderByWithRelationInput | ProjectExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectExperiences
    **/
    _count?: true | ProjectExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectExperienceMaxAggregateInputType
  }

  export type GetProjectExperienceAggregateType<T extends ProjectExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectExperience[P]>
      : GetScalarType<T[P], AggregateProjectExperience[P]>
  }




  export type ProjectExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectExperienceWhereInput
    orderBy?: ProjectExperienceOrderByWithAggregationInput | ProjectExperienceOrderByWithAggregationInput[]
    by: ProjectExperienceScalarFieldEnum[] | ProjectExperienceScalarFieldEnum
    having?: ProjectExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectExperienceCountAggregateInputType | true
    _min?: ProjectExperienceMinAggregateInputType
    _max?: ProjectExperienceMaxAggregateInputType
  }

  export type ProjectExperienceGroupByOutputType = {
    id: string
    student_id: string
    experience_type: $Enums.ExperienceType
    title: string
    organization: string | null
    location: string | null
    start_date: Date
    end_date: Date | null
    is_ongoing: boolean
    role_title: string | null
    description: string | null
    outcomes: string | null
    skills_learned: JsonValue | null
    project_link: string | null
    mentor_name: string | null
    mentor_email: string | null
    status: $Enums.ProjectStatus
    created_at: Date
    updated_at: Date
    _count: ProjectExperienceCountAggregateOutputType | null
    _min: ProjectExperienceMinAggregateOutputType | null
    _max: ProjectExperienceMaxAggregateOutputType | null
  }

  type GetProjectExperienceGroupByPayload<T extends ProjectExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectExperienceGroupByOutputType[P]>
        }
      >
    >


  export type ProjectExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    experience_type?: boolean
    title?: boolean
    organization?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
    is_ongoing?: boolean
    role_title?: boolean
    description?: boolean
    outcomes?: boolean
    skills_learned?: boolean
    project_link?: boolean
    mentor_name?: boolean
    mentor_email?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectExperience"]>

  export type ProjectExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    experience_type?: boolean
    title?: boolean
    organization?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
    is_ongoing?: boolean
    role_title?: boolean
    description?: boolean
    outcomes?: boolean
    skills_learned?: boolean
    project_link?: boolean
    mentor_name?: boolean
    mentor_email?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectExperience"]>

  export type ProjectExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    experience_type?: boolean
    title?: boolean
    organization?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
    is_ongoing?: boolean
    role_title?: boolean
    description?: boolean
    outcomes?: boolean
    skills_learned?: boolean
    project_link?: boolean
    mentor_name?: boolean
    mentor_email?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectExperience"]>

  export type ProjectExperienceSelectScalar = {
    id?: boolean
    student_id?: boolean
    experience_type?: boolean
    title?: boolean
    organization?: boolean
    location?: boolean
    start_date?: boolean
    end_date?: boolean
    is_ongoing?: boolean
    role_title?: boolean
    description?: boolean
    outcomes?: boolean
    skills_learned?: boolean
    project_link?: boolean
    mentor_name?: boolean
    mentor_email?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProjectExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "experience_type" | "title" | "organization" | "location" | "start_date" | "end_date" | "is_ongoing" | "role_title" | "description" | "outcomes" | "skills_learned" | "project_link" | "mentor_name" | "mentor_email" | "status" | "created_at" | "updated_at", ExtArgs["result"]["projectExperience"]>
  export type ProjectExperienceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type ProjectExperienceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type ProjectExperienceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $ProjectExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectExperience"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string
      experience_type: $Enums.ExperienceType
      title: string
      organization: string | null
      location: string | null
      start_date: Date
      end_date: Date | null
      is_ongoing: boolean
      role_title: string | null
      description: string | null
      outcomes: string | null
      skills_learned: Prisma.JsonValue | null
      project_link: string | null
      mentor_name: string | null
      mentor_email: string | null
      status: $Enums.ProjectStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["projectExperience"]>
    composites: {}
  }

  type ProjectExperienceGetPayload<S extends boolean | null | undefined | ProjectExperienceDefaultArgs> = $Result.GetResult<Prisma.$ProjectExperiencePayload, S>

  type ProjectExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectExperienceCountAggregateInputType | true
    }

  export interface ProjectExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectExperience'], meta: { name: 'ProjectExperience' } }
    /**
     * Find zero or one ProjectExperience that matches the filter.
     * @param {ProjectExperienceFindUniqueArgs} args - Arguments to find a ProjectExperience
     * @example
     * // Get one ProjectExperience
     * const projectExperience = await prisma.projectExperience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectExperienceFindUniqueArgs>(args: SelectSubset<T, ProjectExperienceFindUniqueArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectExperience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectExperienceFindUniqueOrThrowArgs} args - Arguments to find a ProjectExperience
     * @example
     * // Get one ProjectExperience
     * const projectExperience = await prisma.projectExperience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectExperience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectExperienceFindFirstArgs} args - Arguments to find a ProjectExperience
     * @example
     * // Get one ProjectExperience
     * const projectExperience = await prisma.projectExperience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectExperienceFindFirstArgs>(args?: SelectSubset<T, ProjectExperienceFindFirstArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectExperience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectExperienceFindFirstOrThrowArgs} args - Arguments to find a ProjectExperience
     * @example
     * // Get one ProjectExperience
     * const projectExperience = await prisma.projectExperience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectExperiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectExperiences
     * const projectExperiences = await prisma.projectExperience.findMany()
     * 
     * // Get first 10 ProjectExperiences
     * const projectExperiences = await prisma.projectExperience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectExperienceWithIdOnly = await prisma.projectExperience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectExperienceFindManyArgs>(args?: SelectSubset<T, ProjectExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectExperience.
     * @param {ProjectExperienceCreateArgs} args - Arguments to create a ProjectExperience.
     * @example
     * // Create one ProjectExperience
     * const ProjectExperience = await prisma.projectExperience.create({
     *   data: {
     *     // ... data to create a ProjectExperience
     *   }
     * })
     * 
     */
    create<T extends ProjectExperienceCreateArgs>(args: SelectSubset<T, ProjectExperienceCreateArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectExperiences.
     * @param {ProjectExperienceCreateManyArgs} args - Arguments to create many ProjectExperiences.
     * @example
     * // Create many ProjectExperiences
     * const projectExperience = await prisma.projectExperience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectExperienceCreateManyArgs>(args?: SelectSubset<T, ProjectExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectExperiences and returns the data saved in the database.
     * @param {ProjectExperienceCreateManyAndReturnArgs} args - Arguments to create many ProjectExperiences.
     * @example
     * // Create many ProjectExperiences
     * const projectExperience = await prisma.projectExperience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectExperiences and only return the `id`
     * const projectExperienceWithIdOnly = await prisma.projectExperience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectExperience.
     * @param {ProjectExperienceDeleteArgs} args - Arguments to delete one ProjectExperience.
     * @example
     * // Delete one ProjectExperience
     * const ProjectExperience = await prisma.projectExperience.delete({
     *   where: {
     *     // ... filter to delete one ProjectExperience
     *   }
     * })
     * 
     */
    delete<T extends ProjectExperienceDeleteArgs>(args: SelectSubset<T, ProjectExperienceDeleteArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectExperience.
     * @param {ProjectExperienceUpdateArgs} args - Arguments to update one ProjectExperience.
     * @example
     * // Update one ProjectExperience
     * const projectExperience = await prisma.projectExperience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectExperienceUpdateArgs>(args: SelectSubset<T, ProjectExperienceUpdateArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectExperiences.
     * @param {ProjectExperienceDeleteManyArgs} args - Arguments to filter ProjectExperiences to delete.
     * @example
     * // Delete a few ProjectExperiences
     * const { count } = await prisma.projectExperience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectExperienceDeleteManyArgs>(args?: SelectSubset<T, ProjectExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectExperiences
     * const projectExperience = await prisma.projectExperience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectExperienceUpdateManyArgs>(args: SelectSubset<T, ProjectExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectExperiences and returns the data updated in the database.
     * @param {ProjectExperienceUpdateManyAndReturnArgs} args - Arguments to update many ProjectExperiences.
     * @example
     * // Update many ProjectExperiences
     * const projectExperience = await prisma.projectExperience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectExperiences and only return the `id`
     * const projectExperienceWithIdOnly = await prisma.projectExperience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectExperience.
     * @param {ProjectExperienceUpsertArgs} args - Arguments to update or create a ProjectExperience.
     * @example
     * // Update or create a ProjectExperience
     * const projectExperience = await prisma.projectExperience.upsert({
     *   create: {
     *     // ... data to create a ProjectExperience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectExperience we want to update
     *   }
     * })
     */
    upsert<T extends ProjectExperienceUpsertArgs>(args: SelectSubset<T, ProjectExperienceUpsertArgs<ExtArgs>>): Prisma__ProjectExperienceClient<$Result.GetResult<Prisma.$ProjectExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectExperienceCountArgs} args - Arguments to filter ProjectExperiences to count.
     * @example
     * // Count the number of ProjectExperiences
     * const count = await prisma.projectExperience.count({
     *   where: {
     *     // ... the filter for the ProjectExperiences we want to count
     *   }
     * })
    **/
    count<T extends ProjectExperienceCountArgs>(
      args?: Subset<T, ProjectExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectExperienceAggregateArgs>(args: Subset<T, ProjectExperienceAggregateArgs>): Prisma.PrismaPromise<GetProjectExperienceAggregateType<T>>

    /**
     * Group by ProjectExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectExperienceGroupByArgs['orderBy'] }
        : { orderBy?: ProjectExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectExperience model
   */
  readonly fields: ProjectExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectExperience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectExperience model
   */
  interface ProjectExperienceFieldRefs {
    readonly id: FieldRef<"ProjectExperience", 'String'>
    readonly student_id: FieldRef<"ProjectExperience", 'String'>
    readonly experience_type: FieldRef<"ProjectExperience", 'ExperienceType'>
    readonly title: FieldRef<"ProjectExperience", 'String'>
    readonly organization: FieldRef<"ProjectExperience", 'String'>
    readonly location: FieldRef<"ProjectExperience", 'String'>
    readonly start_date: FieldRef<"ProjectExperience", 'DateTime'>
    readonly end_date: FieldRef<"ProjectExperience", 'DateTime'>
    readonly is_ongoing: FieldRef<"ProjectExperience", 'Boolean'>
    readonly role_title: FieldRef<"ProjectExperience", 'String'>
    readonly description: FieldRef<"ProjectExperience", 'String'>
    readonly outcomes: FieldRef<"ProjectExperience", 'String'>
    readonly skills_learned: FieldRef<"ProjectExperience", 'Json'>
    readonly project_link: FieldRef<"ProjectExperience", 'String'>
    readonly mentor_name: FieldRef<"ProjectExperience", 'String'>
    readonly mentor_email: FieldRef<"ProjectExperience", 'String'>
    readonly status: FieldRef<"ProjectExperience", 'ProjectStatus'>
    readonly created_at: FieldRef<"ProjectExperience", 'DateTime'>
    readonly updated_at: FieldRef<"ProjectExperience", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectExperience findUnique
   */
  export type ProjectExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * Filter, which ProjectExperience to fetch.
     */
    where: ProjectExperienceWhereUniqueInput
  }

  /**
   * ProjectExperience findUniqueOrThrow
   */
  export type ProjectExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * Filter, which ProjectExperience to fetch.
     */
    where: ProjectExperienceWhereUniqueInput
  }

  /**
   * ProjectExperience findFirst
   */
  export type ProjectExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * Filter, which ProjectExperience to fetch.
     */
    where?: ProjectExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectExperiences to fetch.
     */
    orderBy?: ProjectExperienceOrderByWithRelationInput | ProjectExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectExperiences.
     */
    cursor?: ProjectExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectExperiences.
     */
    distinct?: ProjectExperienceScalarFieldEnum | ProjectExperienceScalarFieldEnum[]
  }

  /**
   * ProjectExperience findFirstOrThrow
   */
  export type ProjectExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * Filter, which ProjectExperience to fetch.
     */
    where?: ProjectExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectExperiences to fetch.
     */
    orderBy?: ProjectExperienceOrderByWithRelationInput | ProjectExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectExperiences.
     */
    cursor?: ProjectExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectExperiences.
     */
    distinct?: ProjectExperienceScalarFieldEnum | ProjectExperienceScalarFieldEnum[]
  }

  /**
   * ProjectExperience findMany
   */
  export type ProjectExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * Filter, which ProjectExperiences to fetch.
     */
    where?: ProjectExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectExperiences to fetch.
     */
    orderBy?: ProjectExperienceOrderByWithRelationInput | ProjectExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectExperiences.
     */
    cursor?: ProjectExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectExperiences.
     */
    skip?: number
    distinct?: ProjectExperienceScalarFieldEnum | ProjectExperienceScalarFieldEnum[]
  }

  /**
   * ProjectExperience create
   */
  export type ProjectExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectExperience.
     */
    data: XOR<ProjectExperienceCreateInput, ProjectExperienceUncheckedCreateInput>
  }

  /**
   * ProjectExperience createMany
   */
  export type ProjectExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectExperiences.
     */
    data: ProjectExperienceCreateManyInput | ProjectExperienceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectExperience createManyAndReturn
   */
  export type ProjectExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectExperiences.
     */
    data: ProjectExperienceCreateManyInput | ProjectExperienceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectExperience update
   */
  export type ProjectExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectExperience.
     */
    data: XOR<ProjectExperienceUpdateInput, ProjectExperienceUncheckedUpdateInput>
    /**
     * Choose, which ProjectExperience to update.
     */
    where: ProjectExperienceWhereUniqueInput
  }

  /**
   * ProjectExperience updateMany
   */
  export type ProjectExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectExperiences.
     */
    data: XOR<ProjectExperienceUpdateManyMutationInput, ProjectExperienceUncheckedUpdateManyInput>
    /**
     * Filter which ProjectExperiences to update
     */
    where?: ProjectExperienceWhereInput
    /**
     * Limit how many ProjectExperiences to update.
     */
    limit?: number
  }

  /**
   * ProjectExperience updateManyAndReturn
   */
  export type ProjectExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * The data used to update ProjectExperiences.
     */
    data: XOR<ProjectExperienceUpdateManyMutationInput, ProjectExperienceUncheckedUpdateManyInput>
    /**
     * Filter which ProjectExperiences to update
     */
    where?: ProjectExperienceWhereInput
    /**
     * Limit how many ProjectExperiences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectExperience upsert
   */
  export type ProjectExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectExperience to update in case it exists.
     */
    where: ProjectExperienceWhereUniqueInput
    /**
     * In case the ProjectExperience found by the `where` argument doesn't exist, create a new ProjectExperience with this data.
     */
    create: XOR<ProjectExperienceCreateInput, ProjectExperienceUncheckedCreateInput>
    /**
     * In case the ProjectExperience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectExperienceUpdateInput, ProjectExperienceUncheckedUpdateInput>
  }

  /**
   * ProjectExperience delete
   */
  export type ProjectExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
    /**
     * Filter which ProjectExperience to delete.
     */
    where: ProjectExperienceWhereUniqueInput
  }

  /**
   * ProjectExperience deleteMany
   */
  export type ProjectExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectExperiences to delete
     */
    where?: ProjectExperienceWhereInput
    /**
     * Limit how many ProjectExperiences to delete.
     */
    limit?: number
  }

  /**
   * ProjectExperience without action
   */
  export type ProjectExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectExperience
     */
    select?: ProjectExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectExperience
     */
    omit?: ProjectExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectExperienceInclude<ExtArgs> | null
  }


  /**
   * Model MeetingLog
   */

  export type AggregateMeetingLog = {
    _count: MeetingLogCountAggregateOutputType | null
    _avg: MeetingLogAvgAggregateOutputType | null
    _sum: MeetingLogSumAggregateOutputType | null
    _min: MeetingLogMinAggregateOutputType | null
    _max: MeetingLogMaxAggregateOutputType | null
  }

  export type MeetingLogAvgAggregateOutputType = {
    duration_minutes: number | null
  }

  export type MeetingLogSumAggregateOutputType = {
    duration_minutes: number | null
  }

  export type MeetingLogMinAggregateOutputType = {
    id: string | null
    student_id: string | null
    coordinator_id: string | null
    meeting_date: Date | null
    duration_minutes: number | null
    notes: string | null
    action_items: string | null
    created_at: Date | null
  }

  export type MeetingLogMaxAggregateOutputType = {
    id: string | null
    student_id: string | null
    coordinator_id: string | null
    meeting_date: Date | null
    duration_minutes: number | null
    notes: string | null
    action_items: string | null
    created_at: Date | null
  }

  export type MeetingLogCountAggregateOutputType = {
    id: number
    student_id: number
    coordinator_id: number
    meeting_date: number
    duration_minutes: number
    notes: number
    action_items: number
    created_at: number
    _all: number
  }


  export type MeetingLogAvgAggregateInputType = {
    duration_minutes?: true
  }

  export type MeetingLogSumAggregateInputType = {
    duration_minutes?: true
  }

  export type MeetingLogMinAggregateInputType = {
    id?: true
    student_id?: true
    coordinator_id?: true
    meeting_date?: true
    duration_minutes?: true
    notes?: true
    action_items?: true
    created_at?: true
  }

  export type MeetingLogMaxAggregateInputType = {
    id?: true
    student_id?: true
    coordinator_id?: true
    meeting_date?: true
    duration_minutes?: true
    notes?: true
    action_items?: true
    created_at?: true
  }

  export type MeetingLogCountAggregateInputType = {
    id?: true
    student_id?: true
    coordinator_id?: true
    meeting_date?: true
    duration_minutes?: true
    notes?: true
    action_items?: true
    created_at?: true
    _all?: true
  }

  export type MeetingLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingLog to aggregate.
     */
    where?: MeetingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingLogs to fetch.
     */
    orderBy?: MeetingLogOrderByWithRelationInput | MeetingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeetingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MeetingLogs
    **/
    _count?: true | MeetingLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MeetingLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MeetingLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeetingLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeetingLogMaxAggregateInputType
  }

  export type GetMeetingLogAggregateType<T extends MeetingLogAggregateArgs> = {
        [P in keyof T & keyof AggregateMeetingLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeetingLog[P]>
      : GetScalarType<T[P], AggregateMeetingLog[P]>
  }




  export type MeetingLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeetingLogWhereInput
    orderBy?: MeetingLogOrderByWithAggregationInput | MeetingLogOrderByWithAggregationInput[]
    by: MeetingLogScalarFieldEnum[] | MeetingLogScalarFieldEnum
    having?: MeetingLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeetingLogCountAggregateInputType | true
    _avg?: MeetingLogAvgAggregateInputType
    _sum?: MeetingLogSumAggregateInputType
    _min?: MeetingLogMinAggregateInputType
    _max?: MeetingLogMaxAggregateInputType
  }

  export type MeetingLogGroupByOutputType = {
    id: string
    student_id: string
    coordinator_id: string
    meeting_date: Date
    duration_minutes: number
    notes: string
    action_items: string | null
    created_at: Date
    _count: MeetingLogCountAggregateOutputType | null
    _avg: MeetingLogAvgAggregateOutputType | null
    _sum: MeetingLogSumAggregateOutputType | null
    _min: MeetingLogMinAggregateOutputType | null
    _max: MeetingLogMaxAggregateOutputType | null
  }

  type GetMeetingLogGroupByPayload<T extends MeetingLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeetingLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeetingLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingLogGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingLogGroupByOutputType[P]>
        }
      >
    >


  export type MeetingLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    coordinator_id?: boolean
    meeting_date?: boolean
    duration_minutes?: boolean
    notes?: boolean
    action_items?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    coordinator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingLog"]>

  export type MeetingLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    coordinator_id?: boolean
    meeting_date?: boolean
    duration_minutes?: boolean
    notes?: boolean
    action_items?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    coordinator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingLog"]>

  export type MeetingLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    coordinator_id?: boolean
    meeting_date?: boolean
    duration_minutes?: boolean
    notes?: boolean
    action_items?: boolean
    created_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    coordinator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meetingLog"]>

  export type MeetingLogSelectScalar = {
    id?: boolean
    student_id?: boolean
    coordinator_id?: boolean
    meeting_date?: boolean
    duration_minutes?: boolean
    notes?: boolean
    action_items?: boolean
    created_at?: boolean
  }

  export type MeetingLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "coordinator_id" | "meeting_date" | "duration_minutes" | "notes" | "action_items" | "created_at", ExtArgs["result"]["meetingLog"]>
  export type MeetingLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    coordinator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MeetingLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    coordinator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MeetingLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    coordinator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MeetingLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MeetingLog"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      coordinator: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      student_id: string
      coordinator_id: string
      meeting_date: Date
      duration_minutes: number
      notes: string
      action_items: string | null
      created_at: Date
    }, ExtArgs["result"]["meetingLog"]>
    composites: {}
  }

  type MeetingLogGetPayload<S extends boolean | null | undefined | MeetingLogDefaultArgs> = $Result.GetResult<Prisma.$MeetingLogPayload, S>

  type MeetingLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeetingLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeetingLogCountAggregateInputType | true
    }

  export interface MeetingLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MeetingLog'], meta: { name: 'MeetingLog' } }
    /**
     * Find zero or one MeetingLog that matches the filter.
     * @param {MeetingLogFindUniqueArgs} args - Arguments to find a MeetingLog
     * @example
     * // Get one MeetingLog
     * const meetingLog = await prisma.meetingLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingLogFindUniqueArgs>(args: SelectSubset<T, MeetingLogFindUniqueArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MeetingLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingLogFindUniqueOrThrowArgs} args - Arguments to find a MeetingLog
     * @example
     * // Get one MeetingLog
     * const meetingLog = await prisma.meetingLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingLogFindUniqueOrThrowArgs>(args: SelectSubset<T, MeetingLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingLogFindFirstArgs} args - Arguments to find a MeetingLog
     * @example
     * // Get one MeetingLog
     * const meetingLog = await prisma.meetingLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingLogFindFirstArgs>(args?: SelectSubset<T, MeetingLogFindFirstArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MeetingLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingLogFindFirstOrThrowArgs} args - Arguments to find a MeetingLog
     * @example
     * // Get one MeetingLog
     * const meetingLog = await prisma.meetingLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingLogFindFirstOrThrowArgs>(args?: SelectSubset<T, MeetingLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MeetingLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeetingLogs
     * const meetingLogs = await prisma.meetingLog.findMany()
     * 
     * // Get first 10 MeetingLogs
     * const meetingLogs = await prisma.meetingLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const meetingLogWithIdOnly = await prisma.meetingLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MeetingLogFindManyArgs>(args?: SelectSubset<T, MeetingLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MeetingLog.
     * @param {MeetingLogCreateArgs} args - Arguments to create a MeetingLog.
     * @example
     * // Create one MeetingLog
     * const MeetingLog = await prisma.meetingLog.create({
     *   data: {
     *     // ... data to create a MeetingLog
     *   }
     * })
     * 
     */
    create<T extends MeetingLogCreateArgs>(args: SelectSubset<T, MeetingLogCreateArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MeetingLogs.
     * @param {MeetingLogCreateManyArgs} args - Arguments to create many MeetingLogs.
     * @example
     * // Create many MeetingLogs
     * const meetingLog = await prisma.meetingLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeetingLogCreateManyArgs>(args?: SelectSubset<T, MeetingLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MeetingLogs and returns the data saved in the database.
     * @param {MeetingLogCreateManyAndReturnArgs} args - Arguments to create many MeetingLogs.
     * @example
     * // Create many MeetingLogs
     * const meetingLog = await prisma.meetingLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MeetingLogs and only return the `id`
     * const meetingLogWithIdOnly = await prisma.meetingLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MeetingLogCreateManyAndReturnArgs>(args?: SelectSubset<T, MeetingLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MeetingLog.
     * @param {MeetingLogDeleteArgs} args - Arguments to delete one MeetingLog.
     * @example
     * // Delete one MeetingLog
     * const MeetingLog = await prisma.meetingLog.delete({
     *   where: {
     *     // ... filter to delete one MeetingLog
     *   }
     * })
     * 
     */
    delete<T extends MeetingLogDeleteArgs>(args: SelectSubset<T, MeetingLogDeleteArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MeetingLog.
     * @param {MeetingLogUpdateArgs} args - Arguments to update one MeetingLog.
     * @example
     * // Update one MeetingLog
     * const meetingLog = await prisma.meetingLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeetingLogUpdateArgs>(args: SelectSubset<T, MeetingLogUpdateArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MeetingLogs.
     * @param {MeetingLogDeleteManyArgs} args - Arguments to filter MeetingLogs to delete.
     * @example
     * // Delete a few MeetingLogs
     * const { count } = await prisma.meetingLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeetingLogDeleteManyArgs>(args?: SelectSubset<T, MeetingLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeetingLogs
     * const meetingLog = await prisma.meetingLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeetingLogUpdateManyArgs>(args: SelectSubset<T, MeetingLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MeetingLogs and returns the data updated in the database.
     * @param {MeetingLogUpdateManyAndReturnArgs} args - Arguments to update many MeetingLogs.
     * @example
     * // Update many MeetingLogs
     * const meetingLog = await prisma.meetingLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MeetingLogs and only return the `id`
     * const meetingLogWithIdOnly = await prisma.meetingLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MeetingLogUpdateManyAndReturnArgs>(args: SelectSubset<T, MeetingLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MeetingLog.
     * @param {MeetingLogUpsertArgs} args - Arguments to update or create a MeetingLog.
     * @example
     * // Update or create a MeetingLog
     * const meetingLog = await prisma.meetingLog.upsert({
     *   create: {
     *     // ... data to create a MeetingLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeetingLog we want to update
     *   }
     * })
     */
    upsert<T extends MeetingLogUpsertArgs>(args: SelectSubset<T, MeetingLogUpsertArgs<ExtArgs>>): Prisma__MeetingLogClient<$Result.GetResult<Prisma.$MeetingLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MeetingLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingLogCountArgs} args - Arguments to filter MeetingLogs to count.
     * @example
     * // Count the number of MeetingLogs
     * const count = await prisma.meetingLog.count({
     *   where: {
     *     // ... the filter for the MeetingLogs we want to count
     *   }
     * })
    **/
    count<T extends MeetingLogCountArgs>(
      args?: Subset<T, MeetingLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MeetingLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MeetingLogAggregateArgs>(args: Subset<T, MeetingLogAggregateArgs>): Prisma.PrismaPromise<GetMeetingLogAggregateType<T>>

    /**
     * Group by MeetingLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MeetingLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingLogGroupByArgs['orderBy'] }
        : { orderBy?: MeetingLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MeetingLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeetingLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MeetingLog model
   */
  readonly fields: MeetingLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MeetingLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    coordinator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MeetingLog model
   */
  interface MeetingLogFieldRefs {
    readonly id: FieldRef<"MeetingLog", 'String'>
    readonly student_id: FieldRef<"MeetingLog", 'String'>
    readonly coordinator_id: FieldRef<"MeetingLog", 'String'>
    readonly meeting_date: FieldRef<"MeetingLog", 'DateTime'>
    readonly duration_minutes: FieldRef<"MeetingLog", 'Int'>
    readonly notes: FieldRef<"MeetingLog", 'String'>
    readonly action_items: FieldRef<"MeetingLog", 'String'>
    readonly created_at: FieldRef<"MeetingLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MeetingLog findUnique
   */
  export type MeetingLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * Filter, which MeetingLog to fetch.
     */
    where: MeetingLogWhereUniqueInput
  }

  /**
   * MeetingLog findUniqueOrThrow
   */
  export type MeetingLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * Filter, which MeetingLog to fetch.
     */
    where: MeetingLogWhereUniqueInput
  }

  /**
   * MeetingLog findFirst
   */
  export type MeetingLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * Filter, which MeetingLog to fetch.
     */
    where?: MeetingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingLogs to fetch.
     */
    orderBy?: MeetingLogOrderByWithRelationInput | MeetingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingLogs.
     */
    cursor?: MeetingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingLogs.
     */
    distinct?: MeetingLogScalarFieldEnum | MeetingLogScalarFieldEnum[]
  }

  /**
   * MeetingLog findFirstOrThrow
   */
  export type MeetingLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * Filter, which MeetingLog to fetch.
     */
    where?: MeetingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingLogs to fetch.
     */
    orderBy?: MeetingLogOrderByWithRelationInput | MeetingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MeetingLogs.
     */
    cursor?: MeetingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MeetingLogs.
     */
    distinct?: MeetingLogScalarFieldEnum | MeetingLogScalarFieldEnum[]
  }

  /**
   * MeetingLog findMany
   */
  export type MeetingLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * Filter, which MeetingLogs to fetch.
     */
    where?: MeetingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MeetingLogs to fetch.
     */
    orderBy?: MeetingLogOrderByWithRelationInput | MeetingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MeetingLogs.
     */
    cursor?: MeetingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MeetingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MeetingLogs.
     */
    skip?: number
    distinct?: MeetingLogScalarFieldEnum | MeetingLogScalarFieldEnum[]
  }

  /**
   * MeetingLog create
   */
  export type MeetingLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * The data needed to create a MeetingLog.
     */
    data: XOR<MeetingLogCreateInput, MeetingLogUncheckedCreateInput>
  }

  /**
   * MeetingLog createMany
   */
  export type MeetingLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MeetingLogs.
     */
    data: MeetingLogCreateManyInput | MeetingLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MeetingLog createManyAndReturn
   */
  export type MeetingLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * The data used to create many MeetingLogs.
     */
    data: MeetingLogCreateManyInput | MeetingLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MeetingLog update
   */
  export type MeetingLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * The data needed to update a MeetingLog.
     */
    data: XOR<MeetingLogUpdateInput, MeetingLogUncheckedUpdateInput>
    /**
     * Choose, which MeetingLog to update.
     */
    where: MeetingLogWhereUniqueInput
  }

  /**
   * MeetingLog updateMany
   */
  export type MeetingLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MeetingLogs.
     */
    data: XOR<MeetingLogUpdateManyMutationInput, MeetingLogUncheckedUpdateManyInput>
    /**
     * Filter which MeetingLogs to update
     */
    where?: MeetingLogWhereInput
    /**
     * Limit how many MeetingLogs to update.
     */
    limit?: number
  }

  /**
   * MeetingLog updateManyAndReturn
   */
  export type MeetingLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * The data used to update MeetingLogs.
     */
    data: XOR<MeetingLogUpdateManyMutationInput, MeetingLogUncheckedUpdateManyInput>
    /**
     * Filter which MeetingLogs to update
     */
    where?: MeetingLogWhereInput
    /**
     * Limit how many MeetingLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MeetingLog upsert
   */
  export type MeetingLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * The filter to search for the MeetingLog to update in case it exists.
     */
    where: MeetingLogWhereUniqueInput
    /**
     * In case the MeetingLog found by the `where` argument doesn't exist, create a new MeetingLog with this data.
     */
    create: XOR<MeetingLogCreateInput, MeetingLogUncheckedCreateInput>
    /**
     * In case the MeetingLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingLogUpdateInput, MeetingLogUncheckedUpdateInput>
  }

  /**
   * MeetingLog delete
   */
  export type MeetingLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
    /**
     * Filter which MeetingLog to delete.
     */
    where: MeetingLogWhereUniqueInput
  }

  /**
   * MeetingLog deleteMany
   */
  export type MeetingLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MeetingLogs to delete
     */
    where?: MeetingLogWhereInput
    /**
     * Limit how many MeetingLogs to delete.
     */
    limit?: number
  }

  /**
   * MeetingLog without action
   */
  export type MeetingLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeetingLog
     */
    select?: MeetingLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MeetingLog
     */
    omit?: MeetingLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeetingLogInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectMinAggregateOutputType = {
    id: string | null
    curriculum_type: $Enums.CurriculumType | null
    subject_name: string | null
    is_default: boolean | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: string | null
    curriculum_type: $Enums.CurriculumType | null
    subject_name: string | null
    is_default: boolean | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    curriculum_type: number
    subject_name: number
    is_default: number
    _all: number
  }


  export type SubjectMinAggregateInputType = {
    id?: true
    curriculum_type?: true
    subject_name?: true
    is_default?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    curriculum_type?: true
    subject_name?: true
    is_default?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    curriculum_type?: true
    subject_name?: true
    is_default?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: string
    curriculum_type: $Enums.CurriculumType | null
    subject_name: string
    is_default: boolean
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    curriculum_type?: boolean
    subject_name?: boolean
    is_default?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    curriculum_type?: boolean
    subject_name?: boolean
    is_default?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    curriculum_type?: boolean
    subject_name?: boolean
    is_default?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    curriculum_type?: boolean
    subject_name?: boolean
    is_default?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "curriculum_type" | "subject_name" | "is_default", ExtArgs["result"]["subject"]>

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      curriculum_type: $Enums.CurriculumType | null
      subject_name: string
      is_default: boolean
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'String'>
    readonly curriculum_type: FieldRef<"Subject", 'CurriculumType'>
    readonly subject_name: FieldRef<"Subject", 'String'>
    readonly is_default: FieldRef<"Subject", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
  }


  /**
   * Model ActivityCategory
   */

  export type AggregateActivityCategory = {
    _count: ActivityCategoryCountAggregateOutputType | null
    _min: ActivityCategoryMinAggregateOutputType | null
    _max: ActivityCategoryMaxAggregateOutputType | null
  }

  export type ActivityCategoryMinAggregateOutputType = {
    id: string | null
    category_name: string | null
    is_default: boolean | null
  }

  export type ActivityCategoryMaxAggregateOutputType = {
    id: string | null
    category_name: string | null
    is_default: boolean | null
  }

  export type ActivityCategoryCountAggregateOutputType = {
    id: number
    category_name: number
    is_default: number
    _all: number
  }


  export type ActivityCategoryMinAggregateInputType = {
    id?: true
    category_name?: true
    is_default?: true
  }

  export type ActivityCategoryMaxAggregateInputType = {
    id?: true
    category_name?: true
    is_default?: true
  }

  export type ActivityCategoryCountAggregateInputType = {
    id?: true
    category_name?: true
    is_default?: true
    _all?: true
  }

  export type ActivityCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityCategory to aggregate.
     */
    where?: ActivityCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityCategories to fetch.
     */
    orderBy?: ActivityCategoryOrderByWithRelationInput | ActivityCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityCategories
    **/
    _count?: true | ActivityCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityCategoryMaxAggregateInputType
  }

  export type GetActivityCategoryAggregateType<T extends ActivityCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityCategory[P]>
      : GetScalarType<T[P], AggregateActivityCategory[P]>
  }




  export type ActivityCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityCategoryWhereInput
    orderBy?: ActivityCategoryOrderByWithAggregationInput | ActivityCategoryOrderByWithAggregationInput[]
    by: ActivityCategoryScalarFieldEnum[] | ActivityCategoryScalarFieldEnum
    having?: ActivityCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCategoryCountAggregateInputType | true
    _min?: ActivityCategoryMinAggregateInputType
    _max?: ActivityCategoryMaxAggregateInputType
  }

  export type ActivityCategoryGroupByOutputType = {
    id: string
    category_name: string
    is_default: boolean
    _count: ActivityCategoryCountAggregateOutputType | null
    _min: ActivityCategoryMinAggregateOutputType | null
    _max: ActivityCategoryMaxAggregateOutputType | null
  }

  type GetActivityCategoryGroupByPayload<T extends ActivityCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ActivityCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_name?: boolean
    is_default?: boolean
  }, ExtArgs["result"]["activityCategory"]>

  export type ActivityCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_name?: boolean
    is_default?: boolean
  }, ExtArgs["result"]["activityCategory"]>

  export type ActivityCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category_name?: boolean
    is_default?: boolean
  }, ExtArgs["result"]["activityCategory"]>

  export type ActivityCategorySelectScalar = {
    id?: boolean
    category_name?: boolean
    is_default?: boolean
  }

  export type ActivityCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category_name" | "is_default", ExtArgs["result"]["activityCategory"]>

  export type $ActivityCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityCategory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      category_name: string
      is_default: boolean
    }, ExtArgs["result"]["activityCategory"]>
    composites: {}
  }

  type ActivityCategoryGetPayload<S extends boolean | null | undefined | ActivityCategoryDefaultArgs> = $Result.GetResult<Prisma.$ActivityCategoryPayload, S>

  type ActivityCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCategoryCountAggregateInputType | true
    }

  export interface ActivityCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityCategory'], meta: { name: 'ActivityCategory' } }
    /**
     * Find zero or one ActivityCategory that matches the filter.
     * @param {ActivityCategoryFindUniqueArgs} args - Arguments to find a ActivityCategory
     * @example
     * // Get one ActivityCategory
     * const activityCategory = await prisma.activityCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityCategoryFindUniqueArgs>(args: SelectSubset<T, ActivityCategoryFindUniqueArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityCategoryFindUniqueOrThrowArgs} args - Arguments to find a ActivityCategory
     * @example
     * // Get one ActivityCategory
     * const activityCategory = await prisma.activityCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCategoryFindFirstArgs} args - Arguments to find a ActivityCategory
     * @example
     * // Get one ActivityCategory
     * const activityCategory = await prisma.activityCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityCategoryFindFirstArgs>(args?: SelectSubset<T, ActivityCategoryFindFirstArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCategoryFindFirstOrThrowArgs} args - Arguments to find a ActivityCategory
     * @example
     * // Get one ActivityCategory
     * const activityCategory = await prisma.activityCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityCategories
     * const activityCategories = await prisma.activityCategory.findMany()
     * 
     * // Get first 10 ActivityCategories
     * const activityCategories = await prisma.activityCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityCategoryWithIdOnly = await prisma.activityCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityCategoryFindManyArgs>(args?: SelectSubset<T, ActivityCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityCategory.
     * @param {ActivityCategoryCreateArgs} args - Arguments to create a ActivityCategory.
     * @example
     * // Create one ActivityCategory
     * const ActivityCategory = await prisma.activityCategory.create({
     *   data: {
     *     // ... data to create a ActivityCategory
     *   }
     * })
     * 
     */
    create<T extends ActivityCategoryCreateArgs>(args: SelectSubset<T, ActivityCategoryCreateArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityCategories.
     * @param {ActivityCategoryCreateManyArgs} args - Arguments to create many ActivityCategories.
     * @example
     * // Create many ActivityCategories
     * const activityCategory = await prisma.activityCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCategoryCreateManyArgs>(args?: SelectSubset<T, ActivityCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityCategories and returns the data saved in the database.
     * @param {ActivityCategoryCreateManyAndReturnArgs} args - Arguments to create many ActivityCategories.
     * @example
     * // Create many ActivityCategories
     * const activityCategory = await prisma.activityCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityCategories and only return the `id`
     * const activityCategoryWithIdOnly = await prisma.activityCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityCategory.
     * @param {ActivityCategoryDeleteArgs} args - Arguments to delete one ActivityCategory.
     * @example
     * // Delete one ActivityCategory
     * const ActivityCategory = await prisma.activityCategory.delete({
     *   where: {
     *     // ... filter to delete one ActivityCategory
     *   }
     * })
     * 
     */
    delete<T extends ActivityCategoryDeleteArgs>(args: SelectSubset<T, ActivityCategoryDeleteArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityCategory.
     * @param {ActivityCategoryUpdateArgs} args - Arguments to update one ActivityCategory.
     * @example
     * // Update one ActivityCategory
     * const activityCategory = await prisma.activityCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityCategoryUpdateArgs>(args: SelectSubset<T, ActivityCategoryUpdateArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityCategories.
     * @param {ActivityCategoryDeleteManyArgs} args - Arguments to filter ActivityCategories to delete.
     * @example
     * // Delete a few ActivityCategories
     * const { count } = await prisma.activityCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityCategoryDeleteManyArgs>(args?: SelectSubset<T, ActivityCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityCategories
     * const activityCategory = await prisma.activityCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityCategoryUpdateManyArgs>(args: SelectSubset<T, ActivityCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityCategories and returns the data updated in the database.
     * @param {ActivityCategoryUpdateManyAndReturnArgs} args - Arguments to update many ActivityCategories.
     * @example
     * // Update many ActivityCategories
     * const activityCategory = await prisma.activityCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityCategories and only return the `id`
     * const activityCategoryWithIdOnly = await prisma.activityCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityCategory.
     * @param {ActivityCategoryUpsertArgs} args - Arguments to update or create a ActivityCategory.
     * @example
     * // Update or create a ActivityCategory
     * const activityCategory = await prisma.activityCategory.upsert({
     *   create: {
     *     // ... data to create a ActivityCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityCategory we want to update
     *   }
     * })
     */
    upsert<T extends ActivityCategoryUpsertArgs>(args: SelectSubset<T, ActivityCategoryUpsertArgs<ExtArgs>>): Prisma__ActivityCategoryClient<$Result.GetResult<Prisma.$ActivityCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCategoryCountArgs} args - Arguments to filter ActivityCategories to count.
     * @example
     * // Count the number of ActivityCategories
     * const count = await prisma.activityCategory.count({
     *   where: {
     *     // ... the filter for the ActivityCategories we want to count
     *   }
     * })
    **/
    count<T extends ActivityCategoryCountArgs>(
      args?: Subset<T, ActivityCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityCategoryAggregateArgs>(args: Subset<T, ActivityCategoryAggregateArgs>): Prisma.PrismaPromise<GetActivityCategoryAggregateType<T>>

    /**
     * Group by ActivityCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ActivityCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityCategory model
   */
  readonly fields: ActivityCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityCategory model
   */
  interface ActivityCategoryFieldRefs {
    readonly id: FieldRef<"ActivityCategory", 'String'>
    readonly category_name: FieldRef<"ActivityCategory", 'String'>
    readonly is_default: FieldRef<"ActivityCategory", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ActivityCategory findUnique
   */
  export type ActivityCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ActivityCategory to fetch.
     */
    where: ActivityCategoryWhereUniqueInput
  }

  /**
   * ActivityCategory findUniqueOrThrow
   */
  export type ActivityCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ActivityCategory to fetch.
     */
    where: ActivityCategoryWhereUniqueInput
  }

  /**
   * ActivityCategory findFirst
   */
  export type ActivityCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ActivityCategory to fetch.
     */
    where?: ActivityCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityCategories to fetch.
     */
    orderBy?: ActivityCategoryOrderByWithRelationInput | ActivityCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityCategories.
     */
    cursor?: ActivityCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityCategories.
     */
    distinct?: ActivityCategoryScalarFieldEnum | ActivityCategoryScalarFieldEnum[]
  }

  /**
   * ActivityCategory findFirstOrThrow
   */
  export type ActivityCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ActivityCategory to fetch.
     */
    where?: ActivityCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityCategories to fetch.
     */
    orderBy?: ActivityCategoryOrderByWithRelationInput | ActivityCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityCategories.
     */
    cursor?: ActivityCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityCategories.
     */
    distinct?: ActivityCategoryScalarFieldEnum | ActivityCategoryScalarFieldEnum[]
  }

  /**
   * ActivityCategory findMany
   */
  export type ActivityCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ActivityCategories to fetch.
     */
    where?: ActivityCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityCategories to fetch.
     */
    orderBy?: ActivityCategoryOrderByWithRelationInput | ActivityCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityCategories.
     */
    cursor?: ActivityCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityCategories.
     */
    skip?: number
    distinct?: ActivityCategoryScalarFieldEnum | ActivityCategoryScalarFieldEnum[]
  }

  /**
   * ActivityCategory create
   */
  export type ActivityCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * The data needed to create a ActivityCategory.
     */
    data: XOR<ActivityCategoryCreateInput, ActivityCategoryUncheckedCreateInput>
  }

  /**
   * ActivityCategory createMany
   */
  export type ActivityCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityCategories.
     */
    data: ActivityCategoryCreateManyInput | ActivityCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityCategory createManyAndReturn
   */
  export type ActivityCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityCategories.
     */
    data: ActivityCategoryCreateManyInput | ActivityCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityCategory update
   */
  export type ActivityCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * The data needed to update a ActivityCategory.
     */
    data: XOR<ActivityCategoryUpdateInput, ActivityCategoryUncheckedUpdateInput>
    /**
     * Choose, which ActivityCategory to update.
     */
    where: ActivityCategoryWhereUniqueInput
  }

  /**
   * ActivityCategory updateMany
   */
  export type ActivityCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityCategories.
     */
    data: XOR<ActivityCategoryUpdateManyMutationInput, ActivityCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ActivityCategories to update
     */
    where?: ActivityCategoryWhereInput
    /**
     * Limit how many ActivityCategories to update.
     */
    limit?: number
  }

  /**
   * ActivityCategory updateManyAndReturn
   */
  export type ActivityCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ActivityCategories.
     */
    data: XOR<ActivityCategoryUpdateManyMutationInput, ActivityCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ActivityCategories to update
     */
    where?: ActivityCategoryWhereInput
    /**
     * Limit how many ActivityCategories to update.
     */
    limit?: number
  }

  /**
   * ActivityCategory upsert
   */
  export type ActivityCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * The filter to search for the ActivityCategory to update in case it exists.
     */
    where: ActivityCategoryWhereUniqueInput
    /**
     * In case the ActivityCategory found by the `where` argument doesn't exist, create a new ActivityCategory with this data.
     */
    create: XOR<ActivityCategoryCreateInput, ActivityCategoryUncheckedCreateInput>
    /**
     * In case the ActivityCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityCategoryUpdateInput, ActivityCategoryUncheckedUpdateInput>
  }

  /**
   * ActivityCategory delete
   */
  export type ActivityCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
    /**
     * Filter which ActivityCategory to delete.
     */
    where: ActivityCategoryWhereUniqueInput
  }

  /**
   * ActivityCategory deleteMany
   */
  export type ActivityCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityCategories to delete
     */
    where?: ActivityCategoryWhereInput
    /**
     * Limit how many ActivityCategories to delete.
     */
    limit?: number
  }

  /**
   * ActivityCategory without action
   */
  export type ActivityCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCategory
     */
    select?: ActivityCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityCategory
     */
    omit?: ActivityCategoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    logo_url: 'logo_url',
    primary_color: 'primary_color',
    created_at: 'created_at'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    organization_id: 'organization_id',
    email: 'email',
    password_hash: 'password_hash',
    role: 'role',
    first_name: 'first_name',
    last_name: 'last_name',
    created_at: 'created_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    user_id: 'user_id',
    graduation_year: 'graduation_year',
    current_grade: 'current_grade',
    primary_coordinator_id: 'primary_coordinator_id',
    profile_completion_pct: 'profile_completion_pct'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const PersonalProfileScalarFieldEnum: {
    student_id: 'student_id',
    preferred_name: 'preferred_name',
    date_of_birth: 'date_of_birth',
    phone: 'phone',
    current_school: 'current_school',
    school_location: 'school_location',
    parent_name: 'parent_name',
    parent_email: 'parent_email',
    parent_phone: 'parent_phone',
    created_at: 'created_at'
  };

  export type PersonalProfileScalarFieldEnum = (typeof PersonalProfileScalarFieldEnum)[keyof typeof PersonalProfileScalarFieldEnum]


  export const AcademicProfileScalarFieldEnum: {
    student_id: 'student_id',
    curriculum_type: 'curriculum_type',
    grading_system_type: 'grading_system_type',
    current_gpa: 'current_gpa',
    created_at: 'created_at'
  };

  export type AcademicProfileScalarFieldEnum = (typeof AcademicProfileScalarFieldEnum)[keyof typeof AcademicProfileScalarFieldEnum]


  export const TranscriptScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    course_name: 'course_name',
    grade_level: 'grade_level',
    semester: 'semester',
    grade_value: 'grade_value',
    credits: 'credits',
    honors_level: 'honors_level',
    is_board_exam: 'is_board_exam',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TranscriptScalarFieldEnum = (typeof TranscriptScalarFieldEnum)[keyof typeof TranscriptScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    activity_name: 'activity_name',
    category: 'category',
    role: 'role',
    grade_levels: 'grade_levels',
    hours_per_week: 'hours_per_week',
    weeks_per_year: 'weeks_per_year',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const TestScoreScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    test_type: 'test_type',
    test_name: 'test_name',
    test_date: 'test_date',
    composite_score: 'composite_score',
    section_scores: 'section_scores',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TestScoreScalarFieldEnum = (typeof TestScoreScalarFieldEnum)[keyof typeof TestScoreScalarFieldEnum]


  export const AchievementScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    achievement_type: 'achievement_type',
    title: 'title',
    organization: 'organization',
    grade_level: 'grade_level',
    date_achieved: 'date_achieved',
    description: 'description',
    metrics: 'metrics',
    recognition_level: 'recognition_level',
    verifiable_link: 'verifiable_link',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const ProjectExperienceScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    experience_type: 'experience_type',
    title: 'title',
    organization: 'organization',
    location: 'location',
    start_date: 'start_date',
    end_date: 'end_date',
    is_ongoing: 'is_ongoing',
    role_title: 'role_title',
    description: 'description',
    outcomes: 'outcomes',
    skills_learned: 'skills_learned',
    project_link: 'project_link',
    mentor_name: 'mentor_name',
    mentor_email: 'mentor_email',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProjectExperienceScalarFieldEnum = (typeof ProjectExperienceScalarFieldEnum)[keyof typeof ProjectExperienceScalarFieldEnum]


  export const MeetingLogScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    coordinator_id: 'coordinator_id',
    meeting_date: 'meeting_date',
    duration_minutes: 'duration_minutes',
    notes: 'notes',
    action_items: 'action_items',
    created_at: 'created_at'
  };

  export type MeetingLogScalarFieldEnum = (typeof MeetingLogScalarFieldEnum)[keyof typeof MeetingLogScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    curriculum_type: 'curriculum_type',
    subject_name: 'subject_name',
    is_default: 'is_default'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const ActivityCategoryScalarFieldEnum: {
    id: 'id',
    category_name: 'category_name',
    is_default: 'is_default'
  };

  export type ActivityCategoryScalarFieldEnum = (typeof ActivityCategoryScalarFieldEnum)[keyof typeof ActivityCategoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'GradeLevel'
   */
  export type EnumGradeLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GradeLevel'>
    


  /**
   * Reference to a field of type 'GradeLevel[]'
   */
  export type ListEnumGradeLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GradeLevel[]'>
    


  /**
   * Reference to a field of type 'CurriculumType'
   */
  export type EnumCurriculumTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurriculumType'>
    


  /**
   * Reference to a field of type 'CurriculumType[]'
   */
  export type ListEnumCurriculumTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurriculumType[]'>
    


  /**
   * Reference to a field of type 'GradingSystemType'
   */
  export type EnumGradingSystemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GradingSystemType'>
    


  /**
   * Reference to a field of type 'GradingSystemType[]'
   */
  export type ListEnumGradingSystemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GradingSystemType[]'>
    


  /**
   * Reference to a field of type 'Semester'
   */
  export type EnumSemesterFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Semester'>
    


  /**
   * Reference to a field of type 'Semester[]'
   */
  export type ListEnumSemesterFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Semester[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'HonorsLevel'
   */
  export type EnumHonorsLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HonorsLevel'>
    


  /**
   * Reference to a field of type 'HonorsLevel[]'
   */
  export type ListEnumHonorsLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HonorsLevel[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AchievementType'
   */
  export type EnumAchievementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AchievementType'>
    


  /**
   * Reference to a field of type 'AchievementType[]'
   */
  export type ListEnumAchievementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AchievementType[]'>
    


  /**
   * Reference to a field of type 'RecognitionLevel'
   */
  export type EnumRecognitionLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecognitionLevel'>
    


  /**
   * Reference to a field of type 'RecognitionLevel[]'
   */
  export type ListEnumRecognitionLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecognitionLevel[]'>
    


  /**
   * Reference to a field of type 'ExperienceType'
   */
  export type EnumExperienceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceType'>
    


  /**
   * Reference to a field of type 'ExperienceType[]'
   */
  export type ListEnumExperienceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceType[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    logo_url?: StringNullableFilter<"Organization"> | string | null
    primary_color?: StringFilter<"Organization"> | string
    created_at?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    logo_url?: SortOrderInput | SortOrder
    primary_color?: SortOrder
    created_at?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    logo_url?: StringNullableFilter<"Organization"> | string | null
    primary_color?: StringFilter<"Organization"> | string
    created_at?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    logo_url?: SortOrderInput | SortOrder
    primary_color?: SortOrder
    created_at?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    logo_url?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    primary_color?: StringWithAggregatesFilter<"Organization"> | string
    created_at?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    organization_id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    coordinated_students?: StudentListRelationFilter
    meeting_logs?: MeetingLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
    coordinated_students?: StudentOrderByRelationAggregateInput
    meeting_logs?: MeetingLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    organization_id?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    coordinated_students?: StudentListRelationFilter
    meeting_logs?: MeetingLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    organization_id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    first_name?: StringWithAggregatesFilter<"User"> | string
    last_name?: StringWithAggregatesFilter<"User"> | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    user_id?: StringFilter<"Student"> | string
    graduation_year?: IntFilter<"Student"> | number
    current_grade?: EnumGradeLevelFilter<"Student"> | $Enums.GradeLevel
    primary_coordinator_id?: StringNullableFilter<"Student"> | string | null
    profile_completion_pct?: IntFilter<"Student"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    primary_coordinator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    personal_profile?: XOR<PersonalProfileNullableScalarRelationFilter, PersonalProfileWhereInput> | null
    academic_profile?: XOR<AcademicProfileNullableScalarRelationFilter, AcademicProfileWhereInput> | null
    transcripts?: TranscriptListRelationFilter
    activities?: ActivityListRelationFilter
    test_scores?: TestScoreListRelationFilter
    achievements?: AchievementListRelationFilter
    project_experiences?: ProjectExperienceListRelationFilter
    meeting_logs?: MeetingLogListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    user_id?: SortOrder
    graduation_year?: SortOrder
    current_grade?: SortOrder
    primary_coordinator_id?: SortOrderInput | SortOrder
    profile_completion_pct?: SortOrder
    user?: UserOrderByWithRelationInput
    primary_coordinator?: UserOrderByWithRelationInput
    personal_profile?: PersonalProfileOrderByWithRelationInput
    academic_profile?: AcademicProfileOrderByWithRelationInput
    transcripts?: TranscriptOrderByRelationAggregateInput
    activities?: ActivityOrderByRelationAggregateInput
    test_scores?: TestScoreOrderByRelationAggregateInput
    achievements?: AchievementOrderByRelationAggregateInput
    project_experiences?: ProjectExperienceOrderByRelationAggregateInput
    meeting_logs?: MeetingLogOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    graduation_year?: IntFilter<"Student"> | number
    current_grade?: EnumGradeLevelFilter<"Student"> | $Enums.GradeLevel
    primary_coordinator_id?: StringNullableFilter<"Student"> | string | null
    profile_completion_pct?: IntFilter<"Student"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    primary_coordinator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    personal_profile?: XOR<PersonalProfileNullableScalarRelationFilter, PersonalProfileWhereInput> | null
    academic_profile?: XOR<AcademicProfileNullableScalarRelationFilter, AcademicProfileWhereInput> | null
    transcripts?: TranscriptListRelationFilter
    activities?: ActivityListRelationFilter
    test_scores?: TestScoreListRelationFilter
    achievements?: AchievementListRelationFilter
    project_experiences?: ProjectExperienceListRelationFilter
    meeting_logs?: MeetingLogListRelationFilter
  }, "user_id">

  export type StudentOrderByWithAggregationInput = {
    user_id?: SortOrder
    graduation_year?: SortOrder
    current_grade?: SortOrder
    primary_coordinator_id?: SortOrderInput | SortOrder
    profile_completion_pct?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"Student"> | string
    graduation_year?: IntWithAggregatesFilter<"Student"> | number
    current_grade?: EnumGradeLevelWithAggregatesFilter<"Student"> | $Enums.GradeLevel
    primary_coordinator_id?: StringNullableWithAggregatesFilter<"Student"> | string | null
    profile_completion_pct?: IntWithAggregatesFilter<"Student"> | number
  }

  export type PersonalProfileWhereInput = {
    AND?: PersonalProfileWhereInput | PersonalProfileWhereInput[]
    OR?: PersonalProfileWhereInput[]
    NOT?: PersonalProfileWhereInput | PersonalProfileWhereInput[]
    student_id?: StringFilter<"PersonalProfile"> | string
    preferred_name?: StringNullableFilter<"PersonalProfile"> | string | null
    date_of_birth?: DateTimeNullableFilter<"PersonalProfile"> | Date | string | null
    phone?: StringNullableFilter<"PersonalProfile"> | string | null
    current_school?: StringNullableFilter<"PersonalProfile"> | string | null
    school_location?: StringNullableFilter<"PersonalProfile"> | string | null
    parent_name?: StringNullableFilter<"PersonalProfile"> | string | null
    parent_email?: StringNullableFilter<"PersonalProfile"> | string | null
    parent_phone?: StringNullableFilter<"PersonalProfile"> | string | null
    created_at?: DateTimeFilter<"PersonalProfile"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type PersonalProfileOrderByWithRelationInput = {
    student_id?: SortOrder
    preferred_name?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    current_school?: SortOrderInput | SortOrder
    school_location?: SortOrderInput | SortOrder
    parent_name?: SortOrderInput | SortOrder
    parent_email?: SortOrderInput | SortOrder
    parent_phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type PersonalProfileWhereUniqueInput = Prisma.AtLeast<{
    student_id?: string
    AND?: PersonalProfileWhereInput | PersonalProfileWhereInput[]
    OR?: PersonalProfileWhereInput[]
    NOT?: PersonalProfileWhereInput | PersonalProfileWhereInput[]
    preferred_name?: StringNullableFilter<"PersonalProfile"> | string | null
    date_of_birth?: DateTimeNullableFilter<"PersonalProfile"> | Date | string | null
    phone?: StringNullableFilter<"PersonalProfile"> | string | null
    current_school?: StringNullableFilter<"PersonalProfile"> | string | null
    school_location?: StringNullableFilter<"PersonalProfile"> | string | null
    parent_name?: StringNullableFilter<"PersonalProfile"> | string | null
    parent_email?: StringNullableFilter<"PersonalProfile"> | string | null
    parent_phone?: StringNullableFilter<"PersonalProfile"> | string | null
    created_at?: DateTimeFilter<"PersonalProfile"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "student_id">

  export type PersonalProfileOrderByWithAggregationInput = {
    student_id?: SortOrder
    preferred_name?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    current_school?: SortOrderInput | SortOrder
    school_location?: SortOrderInput | SortOrder
    parent_name?: SortOrderInput | SortOrder
    parent_email?: SortOrderInput | SortOrder
    parent_phone?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: PersonalProfileCountOrderByAggregateInput
    _max?: PersonalProfileMaxOrderByAggregateInput
    _min?: PersonalProfileMinOrderByAggregateInput
  }

  export type PersonalProfileScalarWhereWithAggregatesInput = {
    AND?: PersonalProfileScalarWhereWithAggregatesInput | PersonalProfileScalarWhereWithAggregatesInput[]
    OR?: PersonalProfileScalarWhereWithAggregatesInput[]
    NOT?: PersonalProfileScalarWhereWithAggregatesInput | PersonalProfileScalarWhereWithAggregatesInput[]
    student_id?: StringWithAggregatesFilter<"PersonalProfile"> | string
    preferred_name?: StringNullableWithAggregatesFilter<"PersonalProfile"> | string | null
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"PersonalProfile"> | Date | string | null
    phone?: StringNullableWithAggregatesFilter<"PersonalProfile"> | string | null
    current_school?: StringNullableWithAggregatesFilter<"PersonalProfile"> | string | null
    school_location?: StringNullableWithAggregatesFilter<"PersonalProfile"> | string | null
    parent_name?: StringNullableWithAggregatesFilter<"PersonalProfile"> | string | null
    parent_email?: StringNullableWithAggregatesFilter<"PersonalProfile"> | string | null
    parent_phone?: StringNullableWithAggregatesFilter<"PersonalProfile"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"PersonalProfile"> | Date | string
  }

  export type AcademicProfileWhereInput = {
    AND?: AcademicProfileWhereInput | AcademicProfileWhereInput[]
    OR?: AcademicProfileWhereInput[]
    NOT?: AcademicProfileWhereInput | AcademicProfileWhereInput[]
    student_id?: StringFilter<"AcademicProfile"> | string
    curriculum_type?: EnumCurriculumTypeFilter<"AcademicProfile"> | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFilter<"AcademicProfile"> | $Enums.GradingSystemType
    current_gpa?: StringNullableFilter<"AcademicProfile"> | string | null
    created_at?: DateTimeFilter<"AcademicProfile"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type AcademicProfileOrderByWithRelationInput = {
    student_id?: SortOrder
    curriculum_type?: SortOrder
    grading_system_type?: SortOrder
    current_gpa?: SortOrderInput | SortOrder
    created_at?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type AcademicProfileWhereUniqueInput = Prisma.AtLeast<{
    student_id?: string
    AND?: AcademicProfileWhereInput | AcademicProfileWhereInput[]
    OR?: AcademicProfileWhereInput[]
    NOT?: AcademicProfileWhereInput | AcademicProfileWhereInput[]
    curriculum_type?: EnumCurriculumTypeFilter<"AcademicProfile"> | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFilter<"AcademicProfile"> | $Enums.GradingSystemType
    current_gpa?: StringNullableFilter<"AcademicProfile"> | string | null
    created_at?: DateTimeFilter<"AcademicProfile"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "student_id">

  export type AcademicProfileOrderByWithAggregationInput = {
    student_id?: SortOrder
    curriculum_type?: SortOrder
    grading_system_type?: SortOrder
    current_gpa?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AcademicProfileCountOrderByAggregateInput
    _max?: AcademicProfileMaxOrderByAggregateInput
    _min?: AcademicProfileMinOrderByAggregateInput
  }

  export type AcademicProfileScalarWhereWithAggregatesInput = {
    AND?: AcademicProfileScalarWhereWithAggregatesInput | AcademicProfileScalarWhereWithAggregatesInput[]
    OR?: AcademicProfileScalarWhereWithAggregatesInput[]
    NOT?: AcademicProfileScalarWhereWithAggregatesInput | AcademicProfileScalarWhereWithAggregatesInput[]
    student_id?: StringWithAggregatesFilter<"AcademicProfile"> | string
    curriculum_type?: EnumCurriculumTypeWithAggregatesFilter<"AcademicProfile"> | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeWithAggregatesFilter<"AcademicProfile"> | $Enums.GradingSystemType
    current_gpa?: StringNullableWithAggregatesFilter<"AcademicProfile"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"AcademicProfile"> | Date | string
  }

  export type TranscriptWhereInput = {
    AND?: TranscriptWhereInput | TranscriptWhereInput[]
    OR?: TranscriptWhereInput[]
    NOT?: TranscriptWhereInput | TranscriptWhereInput[]
    id?: StringFilter<"Transcript"> | string
    student_id?: StringFilter<"Transcript"> | string
    course_name?: StringFilter<"Transcript"> | string
    grade_level?: EnumGradeLevelFilter<"Transcript"> | $Enums.GradeLevel
    semester?: EnumSemesterFilter<"Transcript"> | $Enums.Semester
    grade_value?: StringFilter<"Transcript"> | string
    credits?: FloatNullableFilter<"Transcript"> | number | null
    honors_level?: EnumHonorsLevelFilter<"Transcript"> | $Enums.HonorsLevel
    is_board_exam?: BoolFilter<"Transcript"> | boolean
    created_at?: DateTimeFilter<"Transcript"> | Date | string
    updated_at?: DateTimeFilter<"Transcript"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type TranscriptOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    course_name?: SortOrder
    grade_level?: SortOrder
    semester?: SortOrder
    grade_value?: SortOrder
    credits?: SortOrderInput | SortOrder
    honors_level?: SortOrder
    is_board_exam?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type TranscriptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TranscriptWhereInput | TranscriptWhereInput[]
    OR?: TranscriptWhereInput[]
    NOT?: TranscriptWhereInput | TranscriptWhereInput[]
    student_id?: StringFilter<"Transcript"> | string
    course_name?: StringFilter<"Transcript"> | string
    grade_level?: EnumGradeLevelFilter<"Transcript"> | $Enums.GradeLevel
    semester?: EnumSemesterFilter<"Transcript"> | $Enums.Semester
    grade_value?: StringFilter<"Transcript"> | string
    credits?: FloatNullableFilter<"Transcript"> | number | null
    honors_level?: EnumHonorsLevelFilter<"Transcript"> | $Enums.HonorsLevel
    is_board_exam?: BoolFilter<"Transcript"> | boolean
    created_at?: DateTimeFilter<"Transcript"> | Date | string
    updated_at?: DateTimeFilter<"Transcript"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type TranscriptOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    course_name?: SortOrder
    grade_level?: SortOrder
    semester?: SortOrder
    grade_value?: SortOrder
    credits?: SortOrderInput | SortOrder
    honors_level?: SortOrder
    is_board_exam?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TranscriptCountOrderByAggregateInput
    _avg?: TranscriptAvgOrderByAggregateInput
    _max?: TranscriptMaxOrderByAggregateInput
    _min?: TranscriptMinOrderByAggregateInput
    _sum?: TranscriptSumOrderByAggregateInput
  }

  export type TranscriptScalarWhereWithAggregatesInput = {
    AND?: TranscriptScalarWhereWithAggregatesInput | TranscriptScalarWhereWithAggregatesInput[]
    OR?: TranscriptScalarWhereWithAggregatesInput[]
    NOT?: TranscriptScalarWhereWithAggregatesInput | TranscriptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transcript"> | string
    student_id?: StringWithAggregatesFilter<"Transcript"> | string
    course_name?: StringWithAggregatesFilter<"Transcript"> | string
    grade_level?: EnumGradeLevelWithAggregatesFilter<"Transcript"> | $Enums.GradeLevel
    semester?: EnumSemesterWithAggregatesFilter<"Transcript"> | $Enums.Semester
    grade_value?: StringWithAggregatesFilter<"Transcript"> | string
    credits?: FloatNullableWithAggregatesFilter<"Transcript"> | number | null
    honors_level?: EnumHonorsLevelWithAggregatesFilter<"Transcript"> | $Enums.HonorsLevel
    is_board_exam?: BoolWithAggregatesFilter<"Transcript"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Transcript"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Transcript"> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    student_id?: StringFilter<"Activity"> | string
    activity_name?: StringFilter<"Activity"> | string
    category?: StringFilter<"Activity"> | string
    role?: StringNullableFilter<"Activity"> | string | null
    grade_levels?: JsonFilter<"Activity">
    hours_per_week?: IntFilter<"Activity"> | number
    weeks_per_year?: IntFilter<"Activity"> | number
    description?: StringNullableFilter<"Activity"> | string | null
    created_at?: DateTimeFilter<"Activity"> | Date | string
    updated_at?: DateTimeFilter<"Activity"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    activity_name?: SortOrder
    category?: SortOrder
    role?: SortOrderInput | SortOrder
    grade_levels?: SortOrder
    hours_per_week?: SortOrder
    weeks_per_year?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    student_id?: StringFilter<"Activity"> | string
    activity_name?: StringFilter<"Activity"> | string
    category?: StringFilter<"Activity"> | string
    role?: StringNullableFilter<"Activity"> | string | null
    grade_levels?: JsonFilter<"Activity">
    hours_per_week?: IntFilter<"Activity"> | number
    weeks_per_year?: IntFilter<"Activity"> | number
    description?: StringNullableFilter<"Activity"> | string | null
    created_at?: DateTimeFilter<"Activity"> | Date | string
    updated_at?: DateTimeFilter<"Activity"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    activity_name?: SortOrder
    category?: SortOrder
    role?: SortOrderInput | SortOrder
    grade_levels?: SortOrder
    hours_per_week?: SortOrder
    weeks_per_year?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    student_id?: StringWithAggregatesFilter<"Activity"> | string
    activity_name?: StringWithAggregatesFilter<"Activity"> | string
    category?: StringWithAggregatesFilter<"Activity"> | string
    role?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    grade_levels?: JsonWithAggregatesFilter<"Activity">
    hours_per_week?: IntWithAggregatesFilter<"Activity"> | number
    weeks_per_year?: IntWithAggregatesFilter<"Activity"> | number
    description?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
  }

  export type TestScoreWhereInput = {
    AND?: TestScoreWhereInput | TestScoreWhereInput[]
    OR?: TestScoreWhereInput[]
    NOT?: TestScoreWhereInput | TestScoreWhereInput[]
    id?: StringFilter<"TestScore"> | string
    student_id?: StringFilter<"TestScore"> | string
    test_type?: StringFilter<"TestScore"> | string
    test_name?: StringFilter<"TestScore"> | string
    test_date?: DateTimeFilter<"TestScore"> | Date | string
    composite_score?: IntNullableFilter<"TestScore"> | number | null
    section_scores?: JsonNullableFilter<"TestScore">
    created_at?: DateTimeFilter<"TestScore"> | Date | string
    updated_at?: DateTimeFilter<"TestScore"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type TestScoreOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    test_type?: SortOrder
    test_name?: SortOrder
    test_date?: SortOrder
    composite_score?: SortOrderInput | SortOrder
    section_scores?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type TestScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestScoreWhereInput | TestScoreWhereInput[]
    OR?: TestScoreWhereInput[]
    NOT?: TestScoreWhereInput | TestScoreWhereInput[]
    student_id?: StringFilter<"TestScore"> | string
    test_type?: StringFilter<"TestScore"> | string
    test_name?: StringFilter<"TestScore"> | string
    test_date?: DateTimeFilter<"TestScore"> | Date | string
    composite_score?: IntNullableFilter<"TestScore"> | number | null
    section_scores?: JsonNullableFilter<"TestScore">
    created_at?: DateTimeFilter<"TestScore"> | Date | string
    updated_at?: DateTimeFilter<"TestScore"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type TestScoreOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    test_type?: SortOrder
    test_name?: SortOrder
    test_date?: SortOrder
    composite_score?: SortOrderInput | SortOrder
    section_scores?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TestScoreCountOrderByAggregateInput
    _avg?: TestScoreAvgOrderByAggregateInput
    _max?: TestScoreMaxOrderByAggregateInput
    _min?: TestScoreMinOrderByAggregateInput
    _sum?: TestScoreSumOrderByAggregateInput
  }

  export type TestScoreScalarWhereWithAggregatesInput = {
    AND?: TestScoreScalarWhereWithAggregatesInput | TestScoreScalarWhereWithAggregatesInput[]
    OR?: TestScoreScalarWhereWithAggregatesInput[]
    NOT?: TestScoreScalarWhereWithAggregatesInput | TestScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestScore"> | string
    student_id?: StringWithAggregatesFilter<"TestScore"> | string
    test_type?: StringWithAggregatesFilter<"TestScore"> | string
    test_name?: StringWithAggregatesFilter<"TestScore"> | string
    test_date?: DateTimeWithAggregatesFilter<"TestScore"> | Date | string
    composite_score?: IntNullableWithAggregatesFilter<"TestScore"> | number | null
    section_scores?: JsonNullableWithAggregatesFilter<"TestScore">
    created_at?: DateTimeWithAggregatesFilter<"TestScore"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"TestScore"> | Date | string
  }

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    id?: StringFilter<"Achievement"> | string
    student_id?: StringFilter<"Achievement"> | string
    achievement_type?: EnumAchievementTypeFilter<"Achievement"> | $Enums.AchievementType
    title?: StringFilter<"Achievement"> | string
    organization?: StringNullableFilter<"Achievement"> | string | null
    grade_level?: EnumGradeLevelNullableFilter<"Achievement"> | $Enums.GradeLevel | null
    date_achieved?: DateTimeNullableFilter<"Achievement"> | Date | string | null
    description?: StringNullableFilter<"Achievement"> | string | null
    metrics?: StringNullableFilter<"Achievement"> | string | null
    recognition_level?: EnumRecognitionLevelNullableFilter<"Achievement"> | $Enums.RecognitionLevel | null
    verifiable_link?: StringNullableFilter<"Achievement"> | string | null
    created_at?: DateTimeFilter<"Achievement"> | Date | string
    updated_at?: DateTimeFilter<"Achievement"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    achievement_type?: SortOrder
    title?: SortOrder
    organization?: SortOrderInput | SortOrder
    grade_level?: SortOrderInput | SortOrder
    date_achieved?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    metrics?: SortOrderInput | SortOrder
    recognition_level?: SortOrderInput | SortOrder
    verifiable_link?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type AchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    student_id?: StringFilter<"Achievement"> | string
    achievement_type?: EnumAchievementTypeFilter<"Achievement"> | $Enums.AchievementType
    title?: StringFilter<"Achievement"> | string
    organization?: StringNullableFilter<"Achievement"> | string | null
    grade_level?: EnumGradeLevelNullableFilter<"Achievement"> | $Enums.GradeLevel | null
    date_achieved?: DateTimeNullableFilter<"Achievement"> | Date | string | null
    description?: StringNullableFilter<"Achievement"> | string | null
    metrics?: StringNullableFilter<"Achievement"> | string | null
    recognition_level?: EnumRecognitionLevelNullableFilter<"Achievement"> | $Enums.RecognitionLevel | null
    verifiable_link?: StringNullableFilter<"Achievement"> | string | null
    created_at?: DateTimeFilter<"Achievement"> | Date | string
    updated_at?: DateTimeFilter<"Achievement"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    achievement_type?: SortOrder
    title?: SortOrder
    organization?: SortOrderInput | SortOrder
    grade_level?: SortOrderInput | SortOrder
    date_achieved?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    metrics?: SortOrderInput | SortOrder
    recognition_level?: SortOrderInput | SortOrder
    verifiable_link?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    OR?: AchievementScalarWhereWithAggregatesInput[]
    NOT?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Achievement"> | string
    student_id?: StringWithAggregatesFilter<"Achievement"> | string
    achievement_type?: EnumAchievementTypeWithAggregatesFilter<"Achievement"> | $Enums.AchievementType
    title?: StringWithAggregatesFilter<"Achievement"> | string
    organization?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    grade_level?: EnumGradeLevelNullableWithAggregatesFilter<"Achievement"> | $Enums.GradeLevel | null
    date_achieved?: DateTimeNullableWithAggregatesFilter<"Achievement"> | Date | string | null
    description?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    metrics?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    recognition_level?: EnumRecognitionLevelNullableWithAggregatesFilter<"Achievement"> | $Enums.RecognitionLevel | null
    verifiable_link?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Achievement"> | Date | string
  }

  export type ProjectExperienceWhereInput = {
    AND?: ProjectExperienceWhereInput | ProjectExperienceWhereInput[]
    OR?: ProjectExperienceWhereInput[]
    NOT?: ProjectExperienceWhereInput | ProjectExperienceWhereInput[]
    id?: StringFilter<"ProjectExperience"> | string
    student_id?: StringFilter<"ProjectExperience"> | string
    experience_type?: EnumExperienceTypeFilter<"ProjectExperience"> | $Enums.ExperienceType
    title?: StringFilter<"ProjectExperience"> | string
    organization?: StringNullableFilter<"ProjectExperience"> | string | null
    location?: StringNullableFilter<"ProjectExperience"> | string | null
    start_date?: DateTimeFilter<"ProjectExperience"> | Date | string
    end_date?: DateTimeNullableFilter<"ProjectExperience"> | Date | string | null
    is_ongoing?: BoolFilter<"ProjectExperience"> | boolean
    role_title?: StringNullableFilter<"ProjectExperience"> | string | null
    description?: StringNullableFilter<"ProjectExperience"> | string | null
    outcomes?: StringNullableFilter<"ProjectExperience"> | string | null
    skills_learned?: JsonNullableFilter<"ProjectExperience">
    project_link?: StringNullableFilter<"ProjectExperience"> | string | null
    mentor_name?: StringNullableFilter<"ProjectExperience"> | string | null
    mentor_email?: StringNullableFilter<"ProjectExperience"> | string | null
    status?: EnumProjectStatusFilter<"ProjectExperience"> | $Enums.ProjectStatus
    created_at?: DateTimeFilter<"ProjectExperience"> | Date | string
    updated_at?: DateTimeFilter<"ProjectExperience"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type ProjectExperienceOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    experience_type?: SortOrder
    title?: SortOrder
    organization?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    is_ongoing?: SortOrder
    role_title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    outcomes?: SortOrderInput | SortOrder
    skills_learned?: SortOrderInput | SortOrder
    project_link?: SortOrderInput | SortOrder
    mentor_name?: SortOrderInput | SortOrder
    mentor_email?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type ProjectExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectExperienceWhereInput | ProjectExperienceWhereInput[]
    OR?: ProjectExperienceWhereInput[]
    NOT?: ProjectExperienceWhereInput | ProjectExperienceWhereInput[]
    student_id?: StringFilter<"ProjectExperience"> | string
    experience_type?: EnumExperienceTypeFilter<"ProjectExperience"> | $Enums.ExperienceType
    title?: StringFilter<"ProjectExperience"> | string
    organization?: StringNullableFilter<"ProjectExperience"> | string | null
    location?: StringNullableFilter<"ProjectExperience"> | string | null
    start_date?: DateTimeFilter<"ProjectExperience"> | Date | string
    end_date?: DateTimeNullableFilter<"ProjectExperience"> | Date | string | null
    is_ongoing?: BoolFilter<"ProjectExperience"> | boolean
    role_title?: StringNullableFilter<"ProjectExperience"> | string | null
    description?: StringNullableFilter<"ProjectExperience"> | string | null
    outcomes?: StringNullableFilter<"ProjectExperience"> | string | null
    skills_learned?: JsonNullableFilter<"ProjectExperience">
    project_link?: StringNullableFilter<"ProjectExperience"> | string | null
    mentor_name?: StringNullableFilter<"ProjectExperience"> | string | null
    mentor_email?: StringNullableFilter<"ProjectExperience"> | string | null
    status?: EnumProjectStatusFilter<"ProjectExperience"> | $Enums.ProjectStatus
    created_at?: DateTimeFilter<"ProjectExperience"> | Date | string
    updated_at?: DateTimeFilter<"ProjectExperience"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type ProjectExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    experience_type?: SortOrder
    title?: SortOrder
    organization?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    start_date?: SortOrder
    end_date?: SortOrderInput | SortOrder
    is_ongoing?: SortOrder
    role_title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    outcomes?: SortOrderInput | SortOrder
    skills_learned?: SortOrderInput | SortOrder
    project_link?: SortOrderInput | SortOrder
    mentor_name?: SortOrderInput | SortOrder
    mentor_email?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProjectExperienceCountOrderByAggregateInput
    _max?: ProjectExperienceMaxOrderByAggregateInput
    _min?: ProjectExperienceMinOrderByAggregateInput
  }

  export type ProjectExperienceScalarWhereWithAggregatesInput = {
    AND?: ProjectExperienceScalarWhereWithAggregatesInput | ProjectExperienceScalarWhereWithAggregatesInput[]
    OR?: ProjectExperienceScalarWhereWithAggregatesInput[]
    NOT?: ProjectExperienceScalarWhereWithAggregatesInput | ProjectExperienceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectExperience"> | string
    student_id?: StringWithAggregatesFilter<"ProjectExperience"> | string
    experience_type?: EnumExperienceTypeWithAggregatesFilter<"ProjectExperience"> | $Enums.ExperienceType
    title?: StringWithAggregatesFilter<"ProjectExperience"> | string
    organization?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    location?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    start_date?: DateTimeWithAggregatesFilter<"ProjectExperience"> | Date | string
    end_date?: DateTimeNullableWithAggregatesFilter<"ProjectExperience"> | Date | string | null
    is_ongoing?: BoolWithAggregatesFilter<"ProjectExperience"> | boolean
    role_title?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    description?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    outcomes?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    skills_learned?: JsonNullableWithAggregatesFilter<"ProjectExperience">
    project_link?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    mentor_name?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    mentor_email?: StringNullableWithAggregatesFilter<"ProjectExperience"> | string | null
    status?: EnumProjectStatusWithAggregatesFilter<"ProjectExperience"> | $Enums.ProjectStatus
    created_at?: DateTimeWithAggregatesFilter<"ProjectExperience"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ProjectExperience"> | Date | string
  }

  export type MeetingLogWhereInput = {
    AND?: MeetingLogWhereInput | MeetingLogWhereInput[]
    OR?: MeetingLogWhereInput[]
    NOT?: MeetingLogWhereInput | MeetingLogWhereInput[]
    id?: StringFilter<"MeetingLog"> | string
    student_id?: StringFilter<"MeetingLog"> | string
    coordinator_id?: StringFilter<"MeetingLog"> | string
    meeting_date?: DateTimeFilter<"MeetingLog"> | Date | string
    duration_minutes?: IntFilter<"MeetingLog"> | number
    notes?: StringFilter<"MeetingLog"> | string
    action_items?: StringNullableFilter<"MeetingLog"> | string | null
    created_at?: DateTimeFilter<"MeetingLog"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    coordinator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MeetingLogOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    coordinator_id?: SortOrder
    meeting_date?: SortOrder
    duration_minutes?: SortOrder
    notes?: SortOrder
    action_items?: SortOrderInput | SortOrder
    created_at?: SortOrder
    student?: StudentOrderByWithRelationInput
    coordinator?: UserOrderByWithRelationInput
  }

  export type MeetingLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MeetingLogWhereInput | MeetingLogWhereInput[]
    OR?: MeetingLogWhereInput[]
    NOT?: MeetingLogWhereInput | MeetingLogWhereInput[]
    student_id?: StringFilter<"MeetingLog"> | string
    coordinator_id?: StringFilter<"MeetingLog"> | string
    meeting_date?: DateTimeFilter<"MeetingLog"> | Date | string
    duration_minutes?: IntFilter<"MeetingLog"> | number
    notes?: StringFilter<"MeetingLog"> | string
    action_items?: StringNullableFilter<"MeetingLog"> | string | null
    created_at?: DateTimeFilter<"MeetingLog"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    coordinator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MeetingLogOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    coordinator_id?: SortOrder
    meeting_date?: SortOrder
    duration_minutes?: SortOrder
    notes?: SortOrder
    action_items?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: MeetingLogCountOrderByAggregateInput
    _avg?: MeetingLogAvgOrderByAggregateInput
    _max?: MeetingLogMaxOrderByAggregateInput
    _min?: MeetingLogMinOrderByAggregateInput
    _sum?: MeetingLogSumOrderByAggregateInput
  }

  export type MeetingLogScalarWhereWithAggregatesInput = {
    AND?: MeetingLogScalarWhereWithAggregatesInput | MeetingLogScalarWhereWithAggregatesInput[]
    OR?: MeetingLogScalarWhereWithAggregatesInput[]
    NOT?: MeetingLogScalarWhereWithAggregatesInput | MeetingLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MeetingLog"> | string
    student_id?: StringWithAggregatesFilter<"MeetingLog"> | string
    coordinator_id?: StringWithAggregatesFilter<"MeetingLog"> | string
    meeting_date?: DateTimeWithAggregatesFilter<"MeetingLog"> | Date | string
    duration_minutes?: IntWithAggregatesFilter<"MeetingLog"> | number
    notes?: StringWithAggregatesFilter<"MeetingLog"> | string
    action_items?: StringNullableWithAggregatesFilter<"MeetingLog"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"MeetingLog"> | Date | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: StringFilter<"Subject"> | string
    curriculum_type?: EnumCurriculumTypeNullableFilter<"Subject"> | $Enums.CurriculumType | null
    subject_name?: StringFilter<"Subject"> | string
    is_default?: BoolFilter<"Subject"> | boolean
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    curriculum_type?: SortOrderInput | SortOrder
    subject_name?: SortOrder
    is_default?: SortOrder
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    subject_name_curriculum_type?: SubjectSubject_nameCurriculum_typeCompoundUniqueInput
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    curriculum_type?: EnumCurriculumTypeNullableFilter<"Subject"> | $Enums.CurriculumType | null
    subject_name?: StringFilter<"Subject"> | string
    is_default?: BoolFilter<"Subject"> | boolean
  }, "id" | "subject_name_curriculum_type">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    curriculum_type?: SortOrderInput | SortOrder
    subject_name?: SortOrder
    is_default?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subject"> | string
    curriculum_type?: EnumCurriculumTypeNullableWithAggregatesFilter<"Subject"> | $Enums.CurriculumType | null
    subject_name?: StringWithAggregatesFilter<"Subject"> | string
    is_default?: BoolWithAggregatesFilter<"Subject"> | boolean
  }

  export type ActivityCategoryWhereInput = {
    AND?: ActivityCategoryWhereInput | ActivityCategoryWhereInput[]
    OR?: ActivityCategoryWhereInput[]
    NOT?: ActivityCategoryWhereInput | ActivityCategoryWhereInput[]
    id?: StringFilter<"ActivityCategory"> | string
    category_name?: StringFilter<"ActivityCategory"> | string
    is_default?: BoolFilter<"ActivityCategory"> | boolean
  }

  export type ActivityCategoryOrderByWithRelationInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_default?: SortOrder
  }

  export type ActivityCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    category_name?: string
    AND?: ActivityCategoryWhereInput | ActivityCategoryWhereInput[]
    OR?: ActivityCategoryWhereInput[]
    NOT?: ActivityCategoryWhereInput | ActivityCategoryWhereInput[]
    is_default?: BoolFilter<"ActivityCategory"> | boolean
  }, "id" | "category_name">

  export type ActivityCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_default?: SortOrder
    _count?: ActivityCategoryCountOrderByAggregateInput
    _max?: ActivityCategoryMaxOrderByAggregateInput
    _min?: ActivityCategoryMinOrderByAggregateInput
  }

  export type ActivityCategoryScalarWhereWithAggregatesInput = {
    AND?: ActivityCategoryScalarWhereWithAggregatesInput | ActivityCategoryScalarWhereWithAggregatesInput[]
    OR?: ActivityCategoryScalarWhereWithAggregatesInput[]
    NOT?: ActivityCategoryScalarWhereWithAggregatesInput | ActivityCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityCategory"> | string
    category_name?: StringWithAggregatesFilter<"ActivityCategory"> | string
    is_default?: BoolWithAggregatesFilter<"ActivityCategory"> | boolean
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    logo_url?: string | null
    primary_color?: string
    created_at?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    logo_url?: string | null
    primary_color?: string
    created_at?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    primary_color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    primary_color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    logo_url?: string | null
    primary_color?: string
    created_at?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    primary_color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    primary_color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    student?: StudentCreateNestedOneWithoutUserInput
    coordinated_students?: StudentCreateNestedManyWithoutPrimary_coordinatorInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutCoordinatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    organization_id: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    coordinated_students?: StudentUncheckedCreateNestedManyWithoutPrimary_coordinatorInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutCoordinatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
    coordinated_students?: StudentUpdateManyWithoutPrimary_coordinatorNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutCoordinatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    coordinated_students?: StudentUncheckedUpdateManyWithoutPrimary_coordinatorNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutCoordinatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    organization_id: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
  }

  export type StudentUpdateManyMutationInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
  }

  export type StudentUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
  }

  export type PersonalProfileCreateInput = {
    preferred_name?: string | null
    date_of_birth?: Date | string | null
    phone?: string | null
    current_school?: string | null
    school_location?: string | null
    parent_name?: string | null
    parent_email?: string | null
    parent_phone?: string | null
    created_at?: Date | string
    student: StudentCreateNestedOneWithoutPersonal_profileInput
  }

  export type PersonalProfileUncheckedCreateInput = {
    student_id: string
    preferred_name?: string | null
    date_of_birth?: Date | string | null
    phone?: string | null
    current_school?: string | null
    school_location?: string | null
    parent_name?: string | null
    parent_email?: string | null
    parent_phone?: string | null
    created_at?: Date | string
  }

  export type PersonalProfileUpdateInput = {
    preferred_name?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    current_school?: NullableStringFieldUpdateOperationsInput | string | null
    school_location?: NullableStringFieldUpdateOperationsInput | string | null
    parent_name?: NullableStringFieldUpdateOperationsInput | string | null
    parent_email?: NullableStringFieldUpdateOperationsInput | string | null
    parent_phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutPersonal_profileNestedInput
  }

  export type PersonalProfileUncheckedUpdateInput = {
    student_id?: StringFieldUpdateOperationsInput | string
    preferred_name?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    current_school?: NullableStringFieldUpdateOperationsInput | string | null
    school_location?: NullableStringFieldUpdateOperationsInput | string | null
    parent_name?: NullableStringFieldUpdateOperationsInput | string | null
    parent_email?: NullableStringFieldUpdateOperationsInput | string | null
    parent_phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalProfileCreateManyInput = {
    student_id: string
    preferred_name?: string | null
    date_of_birth?: Date | string | null
    phone?: string | null
    current_school?: string | null
    school_location?: string | null
    parent_name?: string | null
    parent_email?: string | null
    parent_phone?: string | null
    created_at?: Date | string
  }

  export type PersonalProfileUpdateManyMutationInput = {
    preferred_name?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    current_school?: NullableStringFieldUpdateOperationsInput | string | null
    school_location?: NullableStringFieldUpdateOperationsInput | string | null
    parent_name?: NullableStringFieldUpdateOperationsInput | string | null
    parent_email?: NullableStringFieldUpdateOperationsInput | string | null
    parent_phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalProfileUncheckedUpdateManyInput = {
    student_id?: StringFieldUpdateOperationsInput | string
    preferred_name?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    current_school?: NullableStringFieldUpdateOperationsInput | string | null
    school_location?: NullableStringFieldUpdateOperationsInput | string | null
    parent_name?: NullableStringFieldUpdateOperationsInput | string | null
    parent_email?: NullableStringFieldUpdateOperationsInput | string | null
    parent_phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicProfileCreateInput = {
    curriculum_type: $Enums.CurriculumType
    grading_system_type: $Enums.GradingSystemType
    current_gpa?: string | null
    created_at?: Date | string
    student: StudentCreateNestedOneWithoutAcademic_profileInput
  }

  export type AcademicProfileUncheckedCreateInput = {
    student_id: string
    curriculum_type: $Enums.CurriculumType
    grading_system_type: $Enums.GradingSystemType
    current_gpa?: string | null
    created_at?: Date | string
  }

  export type AcademicProfileUpdateInput = {
    curriculum_type?: EnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFieldUpdateOperationsInput | $Enums.GradingSystemType
    current_gpa?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAcademic_profileNestedInput
  }

  export type AcademicProfileUncheckedUpdateInput = {
    student_id?: StringFieldUpdateOperationsInput | string
    curriculum_type?: EnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFieldUpdateOperationsInput | $Enums.GradingSystemType
    current_gpa?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicProfileCreateManyInput = {
    student_id: string
    curriculum_type: $Enums.CurriculumType
    grading_system_type: $Enums.GradingSystemType
    current_gpa?: string | null
    created_at?: Date | string
  }

  export type AcademicProfileUpdateManyMutationInput = {
    curriculum_type?: EnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFieldUpdateOperationsInput | $Enums.GradingSystemType
    current_gpa?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicProfileUncheckedUpdateManyInput = {
    student_id?: StringFieldUpdateOperationsInput | string
    curriculum_type?: EnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFieldUpdateOperationsInput | $Enums.GradingSystemType
    current_gpa?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptCreateInput = {
    id?: string
    course_name: string
    grade_level: $Enums.GradeLevel
    semester: $Enums.Semester
    grade_value: string
    credits?: number | null
    honors_level?: $Enums.HonorsLevel
    is_board_exam?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    student: StudentCreateNestedOneWithoutTranscriptsInput
  }

  export type TranscriptUncheckedCreateInput = {
    id?: string
    student_id: string
    course_name: string
    grade_level: $Enums.GradeLevel
    semester: $Enums.Semester
    grade_value: string
    credits?: number | null
    honors_level?: $Enums.HonorsLevel
    is_board_exam?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TranscriptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    grade_level?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    semester?: EnumSemesterFieldUpdateOperationsInput | $Enums.Semester
    grade_value?: StringFieldUpdateOperationsInput | string
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    honors_level?: EnumHonorsLevelFieldUpdateOperationsInput | $Enums.HonorsLevel
    is_board_exam?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutTranscriptsNestedInput
  }

  export type TranscriptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    grade_level?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    semester?: EnumSemesterFieldUpdateOperationsInput | $Enums.Semester
    grade_value?: StringFieldUpdateOperationsInput | string
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    honors_level?: EnumHonorsLevelFieldUpdateOperationsInput | $Enums.HonorsLevel
    is_board_exam?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptCreateManyInput = {
    id?: string
    student_id: string
    course_name: string
    grade_level: $Enums.GradeLevel
    semester: $Enums.Semester
    grade_value: string
    credits?: number | null
    honors_level?: $Enums.HonorsLevel
    is_board_exam?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TranscriptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    grade_level?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    semester?: EnumSemesterFieldUpdateOperationsInput | $Enums.Semester
    grade_value?: StringFieldUpdateOperationsInput | string
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    honors_level?: EnumHonorsLevelFieldUpdateOperationsInput | $Enums.HonorsLevel
    is_board_exam?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    grade_level?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    semester?: EnumSemesterFieldUpdateOperationsInput | $Enums.Semester
    grade_value?: StringFieldUpdateOperationsInput | string
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    honors_level?: EnumHonorsLevelFieldUpdateOperationsInput | $Enums.HonorsLevel
    is_board_exam?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    id?: string
    activity_name: string
    category: string
    role?: string | null
    grade_levels: JsonNullValueInput | InputJsonValue
    hours_per_week: number
    weeks_per_year: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    student: StudentCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    student_id: string
    activity_name: string
    category: string
    role?: string | null
    grade_levels: JsonNullValueInput | InputJsonValue
    hours_per_week: number
    weeks_per_year: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity_name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    grade_levels?: JsonNullValueInput | InputJsonValue
    hours_per_week?: IntFieldUpdateOperationsInput | number
    weeks_per_year?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    activity_name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    grade_levels?: JsonNullValueInput | InputJsonValue
    hours_per_week?: IntFieldUpdateOperationsInput | number
    weeks_per_year?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyInput = {
    id?: string
    student_id: string
    activity_name: string
    category: string
    role?: string | null
    grade_levels: JsonNullValueInput | InputJsonValue
    hours_per_week: number
    weeks_per_year: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity_name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    grade_levels?: JsonNullValueInput | InputJsonValue
    hours_per_week?: IntFieldUpdateOperationsInput | number
    weeks_per_year?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    activity_name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    grade_levels?: JsonNullValueInput | InputJsonValue
    hours_per_week?: IntFieldUpdateOperationsInput | number
    weeks_per_year?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreCreateInput = {
    id?: string
    test_type: string
    test_name: string
    test_date: Date | string
    composite_score?: number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    student: StudentCreateNestedOneWithoutTest_scoresInput
  }

  export type TestScoreUncheckedCreateInput = {
    id?: string
    student_id: string
    test_type: string
    test_name: string
    test_date: Date | string
    composite_score?: number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TestScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    test_type?: StringFieldUpdateOperationsInput | string
    test_name?: StringFieldUpdateOperationsInput | string
    test_date?: DateTimeFieldUpdateOperationsInput | Date | string
    composite_score?: NullableIntFieldUpdateOperationsInput | number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutTest_scoresNestedInput
  }

  export type TestScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    test_type?: StringFieldUpdateOperationsInput | string
    test_name?: StringFieldUpdateOperationsInput | string
    test_date?: DateTimeFieldUpdateOperationsInput | Date | string
    composite_score?: NullableIntFieldUpdateOperationsInput | number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreCreateManyInput = {
    id?: string
    student_id: string
    test_type: string
    test_name: string
    test_date: Date | string
    composite_score?: number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TestScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    test_type?: StringFieldUpdateOperationsInput | string
    test_name?: StringFieldUpdateOperationsInput | string
    test_date?: DateTimeFieldUpdateOperationsInput | Date | string
    composite_score?: NullableIntFieldUpdateOperationsInput | number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    test_type?: StringFieldUpdateOperationsInput | string
    test_name?: StringFieldUpdateOperationsInput | string
    test_date?: DateTimeFieldUpdateOperationsInput | Date | string
    composite_score?: NullableIntFieldUpdateOperationsInput | number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateInput = {
    id?: string
    achievement_type: $Enums.AchievementType
    title: string
    organization?: string | null
    grade_level?: $Enums.GradeLevel | null
    date_achieved?: Date | string | null
    description?: string | null
    metrics?: string | null
    recognition_level?: $Enums.RecognitionLevel | null
    verifiable_link?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    student: StudentCreateNestedOneWithoutAchievementsInput
  }

  export type AchievementUncheckedCreateInput = {
    id?: string
    student_id: string
    achievement_type: $Enums.AchievementType
    title: string
    organization?: string | null
    grade_level?: $Enums.GradeLevel | null
    date_achieved?: Date | string | null
    description?: string | null
    metrics?: string | null
    recognition_level?: $Enums.RecognitionLevel | null
    verifiable_link?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievement_type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    grade_level?: NullableEnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel | null
    date_achieved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    recognition_level?: NullableEnumRecognitionLevelFieldUpdateOperationsInput | $Enums.RecognitionLevel | null
    verifiable_link?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAchievementsNestedInput
  }

  export type AchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    achievement_type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    grade_level?: NullableEnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel | null
    date_achieved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    recognition_level?: NullableEnumRecognitionLevelFieldUpdateOperationsInput | $Enums.RecognitionLevel | null
    verifiable_link?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateManyInput = {
    id?: string
    student_id: string
    achievement_type: $Enums.AchievementType
    title: string
    organization?: string | null
    grade_level?: $Enums.GradeLevel | null
    date_achieved?: Date | string | null
    description?: string | null
    metrics?: string | null
    recognition_level?: $Enums.RecognitionLevel | null
    verifiable_link?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievement_type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    grade_level?: NullableEnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel | null
    date_achieved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    recognition_level?: NullableEnumRecognitionLevelFieldUpdateOperationsInput | $Enums.RecognitionLevel | null
    verifiable_link?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    achievement_type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    grade_level?: NullableEnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel | null
    date_achieved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    recognition_level?: NullableEnumRecognitionLevelFieldUpdateOperationsInput | $Enums.RecognitionLevel | null
    verifiable_link?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectExperienceCreateInput = {
    id?: string
    experience_type: $Enums.ExperienceType
    title: string
    organization?: string | null
    location?: string | null
    start_date: Date | string
    end_date?: Date | string | null
    is_ongoing?: boolean
    role_title?: string | null
    description?: string | null
    outcomes?: string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: string | null
    mentor_name?: string | null
    mentor_email?: string | null
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
    student: StudentCreateNestedOneWithoutProject_experiencesInput
  }

  export type ProjectExperienceUncheckedCreateInput = {
    id?: string
    student_id: string
    experience_type: $Enums.ExperienceType
    title: string
    organization?: string | null
    location?: string | null
    start_date: Date | string
    end_date?: Date | string | null
    is_ongoing?: boolean
    role_title?: string | null
    description?: string | null
    outcomes?: string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: string | null
    mentor_name?: string | null
    mentor_email?: string | null
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    experience_type?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_ongoing?: BoolFieldUpdateOperationsInput | boolean
    role_title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    outcomes?: NullableStringFieldUpdateOperationsInput | string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_name?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutProject_experiencesNestedInput
  }

  export type ProjectExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    experience_type?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_ongoing?: BoolFieldUpdateOperationsInput | boolean
    role_title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    outcomes?: NullableStringFieldUpdateOperationsInput | string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_name?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectExperienceCreateManyInput = {
    id?: string
    student_id: string
    experience_type: $Enums.ExperienceType
    title: string
    organization?: string | null
    location?: string | null
    start_date: Date | string
    end_date?: Date | string | null
    is_ongoing?: boolean
    role_title?: string | null
    description?: string | null
    outcomes?: string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: string | null
    mentor_name?: string | null
    mentor_email?: string | null
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    experience_type?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_ongoing?: BoolFieldUpdateOperationsInput | boolean
    role_title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    outcomes?: NullableStringFieldUpdateOperationsInput | string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_name?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    experience_type?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_ongoing?: BoolFieldUpdateOperationsInput | boolean
    role_title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    outcomes?: NullableStringFieldUpdateOperationsInput | string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_name?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingLogCreateInput = {
    id?: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
    student: StudentCreateNestedOneWithoutMeeting_logsInput
    coordinator: UserCreateNestedOneWithoutMeeting_logsInput
  }

  export type MeetingLogUncheckedCreateInput = {
    id?: string
    student_id: string
    coordinator_id: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
  }

  export type MeetingLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutMeeting_logsNestedInput
    coordinator?: UserUpdateOneRequiredWithoutMeeting_logsNestedInput
  }

  export type MeetingLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    coordinator_id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingLogCreateManyInput = {
    id?: string
    student_id: string
    coordinator_id: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
  }

  export type MeetingLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    coordinator_id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectCreateInput = {
    id?: string
    curriculum_type?: $Enums.CurriculumType | null
    subject_name: string
    is_default?: boolean
  }

  export type SubjectUncheckedCreateInput = {
    id?: string
    curriculum_type?: $Enums.CurriculumType | null
    subject_name: string
    is_default?: boolean
  }

  export type SubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    curriculum_type?: NullableEnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType | null
    subject_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    curriculum_type?: NullableEnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType | null
    subject_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubjectCreateManyInput = {
    id?: string
    curriculum_type?: $Enums.CurriculumType | null
    subject_name: string
    is_default?: boolean
  }

  export type SubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    curriculum_type?: NullableEnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType | null
    subject_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    curriculum_type?: NullableEnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType | null
    subject_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCategoryCreateInput = {
    id?: string
    category_name: string
    is_default?: boolean
  }

  export type ActivityCategoryUncheckedCreateInput = {
    id?: string
    category_name: string
    is_default?: boolean
  }

  export type ActivityCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCategoryCreateManyInput = {
    id?: string
    category_name: string
    is_default?: boolean
  }

  export type ActivityCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category_name?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logo_url?: SortOrder
    primary_color?: SortOrder
    created_at?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logo_url?: SortOrder
    primary_color?: SortOrder
    created_at?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    logo_url?: SortOrder
    primary_color?: SortOrder
    created_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type StudentNullableScalarRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type MeetingLogListRelationFilter = {
    every?: MeetingLogWhereInput
    some?: MeetingLogWhereInput
    none?: MeetingLogWhereInput
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeetingLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    organization_id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    created_at?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumGradeLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel>
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeLevelFilter<$PrismaModel> | $Enums.GradeLevel
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PersonalProfileNullableScalarRelationFilter = {
    is?: PersonalProfileWhereInput | null
    isNot?: PersonalProfileWhereInput | null
  }

  export type AcademicProfileNullableScalarRelationFilter = {
    is?: AcademicProfileWhereInput | null
    isNot?: AcademicProfileWhereInput | null
  }

  export type TranscriptListRelationFilter = {
    every?: TranscriptWhereInput
    some?: TranscriptWhereInput
    none?: TranscriptWhereInput
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type TestScoreListRelationFilter = {
    every?: TestScoreWhereInput
    some?: TestScoreWhereInput
    none?: TestScoreWhereInput
  }

  export type AchievementListRelationFilter = {
    every?: AchievementWhereInput
    some?: AchievementWhereInput
    none?: AchievementWhereInput
  }

  export type ProjectExperienceListRelationFilter = {
    every?: ProjectExperienceWhereInput
    some?: ProjectExperienceWhereInput
    none?: ProjectExperienceWhereInput
  }

  export type TranscriptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AchievementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    user_id?: SortOrder
    graduation_year?: SortOrder
    current_grade?: SortOrder
    primary_coordinator_id?: SortOrder
    profile_completion_pct?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    graduation_year?: SortOrder
    profile_completion_pct?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    user_id?: SortOrder
    graduation_year?: SortOrder
    current_grade?: SortOrder
    primary_coordinator_id?: SortOrder
    profile_completion_pct?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    user_id?: SortOrder
    graduation_year?: SortOrder
    current_grade?: SortOrder
    primary_coordinator_id?: SortOrder
    profile_completion_pct?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    graduation_year?: SortOrder
    profile_completion_pct?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumGradeLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel>
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeLevelWithAggregatesFilter<$PrismaModel> | $Enums.GradeLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradeLevelFilter<$PrismaModel>
    _max?: NestedEnumGradeLevelFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type PersonalProfileCountOrderByAggregateInput = {
    student_id?: SortOrder
    preferred_name?: SortOrder
    date_of_birth?: SortOrder
    phone?: SortOrder
    current_school?: SortOrder
    school_location?: SortOrder
    parent_name?: SortOrder
    parent_email?: SortOrder
    parent_phone?: SortOrder
    created_at?: SortOrder
  }

  export type PersonalProfileMaxOrderByAggregateInput = {
    student_id?: SortOrder
    preferred_name?: SortOrder
    date_of_birth?: SortOrder
    phone?: SortOrder
    current_school?: SortOrder
    school_location?: SortOrder
    parent_name?: SortOrder
    parent_email?: SortOrder
    parent_phone?: SortOrder
    created_at?: SortOrder
  }

  export type PersonalProfileMinOrderByAggregateInput = {
    student_id?: SortOrder
    preferred_name?: SortOrder
    date_of_birth?: SortOrder
    phone?: SortOrder
    current_school?: SortOrder
    school_location?: SortOrder
    parent_name?: SortOrder
    parent_email?: SortOrder
    parent_phone?: SortOrder
    created_at?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumCurriculumTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurriculumTypeFilter<$PrismaModel> | $Enums.CurriculumType
  }

  export type EnumGradingSystemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GradingSystemType | EnumGradingSystemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradingSystemTypeFilter<$PrismaModel> | $Enums.GradingSystemType
  }

  export type AcademicProfileCountOrderByAggregateInput = {
    student_id?: SortOrder
    curriculum_type?: SortOrder
    grading_system_type?: SortOrder
    current_gpa?: SortOrder
    created_at?: SortOrder
  }

  export type AcademicProfileMaxOrderByAggregateInput = {
    student_id?: SortOrder
    curriculum_type?: SortOrder
    grading_system_type?: SortOrder
    current_gpa?: SortOrder
    created_at?: SortOrder
  }

  export type AcademicProfileMinOrderByAggregateInput = {
    student_id?: SortOrder
    curriculum_type?: SortOrder
    grading_system_type?: SortOrder
    current_gpa?: SortOrder
    created_at?: SortOrder
  }

  export type EnumCurriculumTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurriculumTypeWithAggregatesFilter<$PrismaModel> | $Enums.CurriculumType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurriculumTypeFilter<$PrismaModel>
    _max?: NestedEnumCurriculumTypeFilter<$PrismaModel>
  }

  export type EnumGradingSystemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GradingSystemType | EnumGradingSystemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradingSystemTypeWithAggregatesFilter<$PrismaModel> | $Enums.GradingSystemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradingSystemTypeFilter<$PrismaModel>
    _max?: NestedEnumGradingSystemTypeFilter<$PrismaModel>
  }

  export type EnumSemesterFilter<$PrismaModel = never> = {
    equals?: $Enums.Semester | EnumSemesterFieldRefInput<$PrismaModel>
    in?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    notIn?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    not?: NestedEnumSemesterFilter<$PrismaModel> | $Enums.Semester
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumHonorsLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorsLevel | EnumHonorsLevelFieldRefInput<$PrismaModel>
    in?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorsLevelFilter<$PrismaModel> | $Enums.HonorsLevel
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TranscriptCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    course_name?: SortOrder
    grade_level?: SortOrder
    semester?: SortOrder
    grade_value?: SortOrder
    credits?: SortOrder
    honors_level?: SortOrder
    is_board_exam?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TranscriptAvgOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type TranscriptMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    course_name?: SortOrder
    grade_level?: SortOrder
    semester?: SortOrder
    grade_value?: SortOrder
    credits?: SortOrder
    honors_level?: SortOrder
    is_board_exam?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TranscriptMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    course_name?: SortOrder
    grade_level?: SortOrder
    semester?: SortOrder
    grade_value?: SortOrder
    credits?: SortOrder
    honors_level?: SortOrder
    is_board_exam?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TranscriptSumOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type EnumSemesterWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Semester | EnumSemesterFieldRefInput<$PrismaModel>
    in?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    notIn?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    not?: NestedEnumSemesterWithAggregatesFilter<$PrismaModel> | $Enums.Semester
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSemesterFilter<$PrismaModel>
    _max?: NestedEnumSemesterFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumHonorsLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorsLevel | EnumHonorsLevelFieldRefInput<$PrismaModel>
    in?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorsLevelWithAggregatesFilter<$PrismaModel> | $Enums.HonorsLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHonorsLevelFilter<$PrismaModel>
    _max?: NestedEnumHonorsLevelFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    activity_name?: SortOrder
    category?: SortOrder
    role?: SortOrder
    grade_levels?: SortOrder
    hours_per_week?: SortOrder
    weeks_per_year?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    hours_per_week?: SortOrder
    weeks_per_year?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    activity_name?: SortOrder
    category?: SortOrder
    role?: SortOrder
    hours_per_week?: SortOrder
    weeks_per_year?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    activity_name?: SortOrder
    category?: SortOrder
    role?: SortOrder
    hours_per_week?: SortOrder
    weeks_per_year?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    hours_per_week?: SortOrder
    weeks_per_year?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TestScoreCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    test_type?: SortOrder
    test_name?: SortOrder
    test_date?: SortOrder
    composite_score?: SortOrder
    section_scores?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TestScoreAvgOrderByAggregateInput = {
    composite_score?: SortOrder
  }

  export type TestScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    test_type?: SortOrder
    test_name?: SortOrder
    test_date?: SortOrder
    composite_score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TestScoreMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    test_type?: SortOrder
    test_name?: SortOrder
    test_date?: SortOrder
    composite_score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TestScoreSumOrderByAggregateInput = {
    composite_score?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAchievementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeFilter<$PrismaModel> | $Enums.AchievementType
  }

  export type EnumGradeLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGradeLevelNullableFilter<$PrismaModel> | $Enums.GradeLevel | null
  }

  export type EnumRecognitionLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RecognitionLevel | EnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecognitionLevelNullableFilter<$PrismaModel> | $Enums.RecognitionLevel | null
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    achievement_type?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    grade_level?: SortOrder
    date_achieved?: SortOrder
    description?: SortOrder
    metrics?: SortOrder
    recognition_level?: SortOrder
    verifiable_link?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    achievement_type?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    grade_level?: SortOrder
    date_achieved?: SortOrder
    description?: SortOrder
    metrics?: SortOrder
    recognition_level?: SortOrder
    verifiable_link?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    achievement_type?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    grade_level?: SortOrder
    date_achieved?: SortOrder
    description?: SortOrder
    metrics?: SortOrder
    recognition_level?: SortOrder
    verifiable_link?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumAchievementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeWithAggregatesFilter<$PrismaModel> | $Enums.AchievementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAchievementTypeFilter<$PrismaModel>
    _max?: NestedEnumAchievementTypeFilter<$PrismaModel>
  }

  export type EnumGradeLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGradeLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.GradeLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGradeLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumGradeLevelNullableFilter<$PrismaModel>
  }

  export type EnumRecognitionLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecognitionLevel | EnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecognitionLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.RecognitionLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRecognitionLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumRecognitionLevelNullableFilter<$PrismaModel>
  }

  export type EnumExperienceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeFilter<$PrismaModel> | $Enums.ExperienceType
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type ProjectExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    experience_type?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_ongoing?: SortOrder
    role_title?: SortOrder
    description?: SortOrder
    outcomes?: SortOrder
    skills_learned?: SortOrder
    project_link?: SortOrder
    mentor_name?: SortOrder
    mentor_email?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    experience_type?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_ongoing?: SortOrder
    role_title?: SortOrder
    description?: SortOrder
    outcomes?: SortOrder
    project_link?: SortOrder
    mentor_name?: SortOrder
    mentor_email?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    experience_type?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    location?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_ongoing?: SortOrder
    role_title?: SortOrder
    description?: SortOrder
    outcomes?: SortOrder
    project_link?: SortOrder
    mentor_name?: SortOrder
    mentor_email?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumExperienceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperienceTypeFilter<$PrismaModel>
    _max?: NestedEnumExperienceTypeFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type MeetingLogCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    coordinator_id?: SortOrder
    meeting_date?: SortOrder
    duration_minutes?: SortOrder
    notes?: SortOrder
    action_items?: SortOrder
    created_at?: SortOrder
  }

  export type MeetingLogAvgOrderByAggregateInput = {
    duration_minutes?: SortOrder
  }

  export type MeetingLogMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    coordinator_id?: SortOrder
    meeting_date?: SortOrder
    duration_minutes?: SortOrder
    notes?: SortOrder
    action_items?: SortOrder
    created_at?: SortOrder
  }

  export type MeetingLogMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    coordinator_id?: SortOrder
    meeting_date?: SortOrder
    duration_minutes?: SortOrder
    notes?: SortOrder
    action_items?: SortOrder
    created_at?: SortOrder
  }

  export type MeetingLogSumOrderByAggregateInput = {
    duration_minutes?: SortOrder
  }

  export type EnumCurriculumTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurriculumTypeNullableFilter<$PrismaModel> | $Enums.CurriculumType | null
  }

  export type SubjectSubject_nameCurriculum_typeCompoundUniqueInput = {
    subject_name: string
    curriculum_type: $Enums.CurriculumType
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    curriculum_type?: SortOrder
    subject_name?: SortOrder
    is_default?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    curriculum_type?: SortOrder
    subject_name?: SortOrder
    is_default?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    curriculum_type?: SortOrder
    subject_name?: SortOrder
    is_default?: SortOrder
  }

  export type EnumCurriculumTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurriculumTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CurriculumType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCurriculumTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCurriculumTypeNullableFilter<$PrismaModel>
  }

  export type ActivityCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_default?: SortOrder
  }

  export type ActivityCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_default?: SortOrder
  }

  export type ActivityCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    category_name?: SortOrder
    is_default?: SortOrder
  }

  export type UserCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentCreateNestedManyWithoutPrimary_coordinatorInput = {
    create?: XOR<StudentCreateWithoutPrimary_coordinatorInput, StudentUncheckedCreateWithoutPrimary_coordinatorInput> | StudentCreateWithoutPrimary_coordinatorInput[] | StudentUncheckedCreateWithoutPrimary_coordinatorInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutPrimary_coordinatorInput | StudentCreateOrConnectWithoutPrimary_coordinatorInput[]
    createMany?: StudentCreateManyPrimary_coordinatorInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type MeetingLogCreateNestedManyWithoutCoordinatorInput = {
    create?: XOR<MeetingLogCreateWithoutCoordinatorInput, MeetingLogUncheckedCreateWithoutCoordinatorInput> | MeetingLogCreateWithoutCoordinatorInput[] | MeetingLogUncheckedCreateWithoutCoordinatorInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutCoordinatorInput | MeetingLogCreateOrConnectWithoutCoordinatorInput[]
    createMany?: MeetingLogCreateManyCoordinatorInputEnvelope
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUncheckedCreateNestedManyWithoutPrimary_coordinatorInput = {
    create?: XOR<StudentCreateWithoutPrimary_coordinatorInput, StudentUncheckedCreateWithoutPrimary_coordinatorInput> | StudentCreateWithoutPrimary_coordinatorInput[] | StudentUncheckedCreateWithoutPrimary_coordinatorInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutPrimary_coordinatorInput | StudentCreateOrConnectWithoutPrimary_coordinatorInput[]
    createMany?: StudentCreateManyPrimary_coordinatorInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type MeetingLogUncheckedCreateNestedManyWithoutCoordinatorInput = {
    create?: XOR<MeetingLogCreateWithoutCoordinatorInput, MeetingLogUncheckedCreateWithoutCoordinatorInput> | MeetingLogCreateWithoutCoordinatorInput[] | MeetingLogUncheckedCreateWithoutCoordinatorInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutCoordinatorInput | MeetingLogCreateOrConnectWithoutCoordinatorInput[]
    createMany?: MeetingLogCreateManyCoordinatorInputEnvelope
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type OrganizationUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    upsert?: OrganizationUpsertWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUsersInput, OrganizationUpdateWithoutUsersInput>, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type StudentUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type StudentUpdateManyWithoutPrimary_coordinatorNestedInput = {
    create?: XOR<StudentCreateWithoutPrimary_coordinatorInput, StudentUncheckedCreateWithoutPrimary_coordinatorInput> | StudentCreateWithoutPrimary_coordinatorInput[] | StudentUncheckedCreateWithoutPrimary_coordinatorInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutPrimary_coordinatorInput | StudentCreateOrConnectWithoutPrimary_coordinatorInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutPrimary_coordinatorInput | StudentUpsertWithWhereUniqueWithoutPrimary_coordinatorInput[]
    createMany?: StudentCreateManyPrimary_coordinatorInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutPrimary_coordinatorInput | StudentUpdateWithWhereUniqueWithoutPrimary_coordinatorInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutPrimary_coordinatorInput | StudentUpdateManyWithWhereWithoutPrimary_coordinatorInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type MeetingLogUpdateManyWithoutCoordinatorNestedInput = {
    create?: XOR<MeetingLogCreateWithoutCoordinatorInput, MeetingLogUncheckedCreateWithoutCoordinatorInput> | MeetingLogCreateWithoutCoordinatorInput[] | MeetingLogUncheckedCreateWithoutCoordinatorInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutCoordinatorInput | MeetingLogCreateOrConnectWithoutCoordinatorInput[]
    upsert?: MeetingLogUpsertWithWhereUniqueWithoutCoordinatorInput | MeetingLogUpsertWithWhereUniqueWithoutCoordinatorInput[]
    createMany?: MeetingLogCreateManyCoordinatorInputEnvelope
    set?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    disconnect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    delete?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    update?: MeetingLogUpdateWithWhereUniqueWithoutCoordinatorInput | MeetingLogUpdateWithWhereUniqueWithoutCoordinatorInput[]
    updateMany?: MeetingLogUpdateManyWithWhereWithoutCoordinatorInput | MeetingLogUpdateManyWithWhereWithoutCoordinatorInput[]
    deleteMany?: MeetingLogScalarWhereInput | MeetingLogScalarWhereInput[]
  }

  export type StudentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type StudentUncheckedUpdateManyWithoutPrimary_coordinatorNestedInput = {
    create?: XOR<StudentCreateWithoutPrimary_coordinatorInput, StudentUncheckedCreateWithoutPrimary_coordinatorInput> | StudentCreateWithoutPrimary_coordinatorInput[] | StudentUncheckedCreateWithoutPrimary_coordinatorInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutPrimary_coordinatorInput | StudentCreateOrConnectWithoutPrimary_coordinatorInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutPrimary_coordinatorInput | StudentUpsertWithWhereUniqueWithoutPrimary_coordinatorInput[]
    createMany?: StudentCreateManyPrimary_coordinatorInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutPrimary_coordinatorInput | StudentUpdateWithWhereUniqueWithoutPrimary_coordinatorInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutPrimary_coordinatorInput | StudentUpdateManyWithWhereWithoutPrimary_coordinatorInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type MeetingLogUncheckedUpdateManyWithoutCoordinatorNestedInput = {
    create?: XOR<MeetingLogCreateWithoutCoordinatorInput, MeetingLogUncheckedCreateWithoutCoordinatorInput> | MeetingLogCreateWithoutCoordinatorInput[] | MeetingLogUncheckedCreateWithoutCoordinatorInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutCoordinatorInput | MeetingLogCreateOrConnectWithoutCoordinatorInput[]
    upsert?: MeetingLogUpsertWithWhereUniqueWithoutCoordinatorInput | MeetingLogUpsertWithWhereUniqueWithoutCoordinatorInput[]
    createMany?: MeetingLogCreateManyCoordinatorInputEnvelope
    set?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    disconnect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    delete?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    update?: MeetingLogUpdateWithWhereUniqueWithoutCoordinatorInput | MeetingLogUpdateWithWhereUniqueWithoutCoordinatorInput[]
    updateMany?: MeetingLogUpdateManyWithWhereWithoutCoordinatorInput | MeetingLogUpdateManyWithWhereWithoutCoordinatorInput[]
    deleteMany?: MeetingLogScalarWhereInput | MeetingLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCoordinated_studentsInput = {
    create?: XOR<UserCreateWithoutCoordinated_studentsInput, UserUncheckedCreateWithoutCoordinated_studentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoordinated_studentsInput
    connect?: UserWhereUniqueInput
  }

  export type PersonalProfileCreateNestedOneWithoutStudentInput = {
    create?: XOR<PersonalProfileCreateWithoutStudentInput, PersonalProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalProfileCreateOrConnectWithoutStudentInput
    connect?: PersonalProfileWhereUniqueInput
  }

  export type AcademicProfileCreateNestedOneWithoutStudentInput = {
    create?: XOR<AcademicProfileCreateWithoutStudentInput, AcademicProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AcademicProfileCreateOrConnectWithoutStudentInput
    connect?: AcademicProfileWhereUniqueInput
  }

  export type TranscriptCreateNestedManyWithoutStudentInput = {
    create?: XOR<TranscriptCreateWithoutStudentInput, TranscriptUncheckedCreateWithoutStudentInput> | TranscriptCreateWithoutStudentInput[] | TranscriptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutStudentInput | TranscriptCreateOrConnectWithoutStudentInput[]
    createMany?: TranscriptCreateManyStudentInputEnvelope
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
  }

  export type ActivityCreateNestedManyWithoutStudentInput = {
    create?: XOR<ActivityCreateWithoutStudentInput, ActivityUncheckedCreateWithoutStudentInput> | ActivityCreateWithoutStudentInput[] | ActivityUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutStudentInput | ActivityCreateOrConnectWithoutStudentInput[]
    createMany?: ActivityCreateManyStudentInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TestScoreCreateNestedManyWithoutStudentInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type AchievementCreateNestedManyWithoutStudentInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
  }

  export type ProjectExperienceCreateNestedManyWithoutStudentInput = {
    create?: XOR<ProjectExperienceCreateWithoutStudentInput, ProjectExperienceUncheckedCreateWithoutStudentInput> | ProjectExperienceCreateWithoutStudentInput[] | ProjectExperienceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProjectExperienceCreateOrConnectWithoutStudentInput | ProjectExperienceCreateOrConnectWithoutStudentInput[]
    createMany?: ProjectExperienceCreateManyStudentInputEnvelope
    connect?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
  }

  export type MeetingLogCreateNestedManyWithoutStudentInput = {
    create?: XOR<MeetingLogCreateWithoutStudentInput, MeetingLogUncheckedCreateWithoutStudentInput> | MeetingLogCreateWithoutStudentInput[] | MeetingLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutStudentInput | MeetingLogCreateOrConnectWithoutStudentInput[]
    createMany?: MeetingLogCreateManyStudentInputEnvelope
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
  }

  export type PersonalProfileUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<PersonalProfileCreateWithoutStudentInput, PersonalProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalProfileCreateOrConnectWithoutStudentInput
    connect?: PersonalProfileWhereUniqueInput
  }

  export type AcademicProfileUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<AcademicProfileCreateWithoutStudentInput, AcademicProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AcademicProfileCreateOrConnectWithoutStudentInput
    connect?: AcademicProfileWhereUniqueInput
  }

  export type TranscriptUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<TranscriptCreateWithoutStudentInput, TranscriptUncheckedCreateWithoutStudentInput> | TranscriptCreateWithoutStudentInput[] | TranscriptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutStudentInput | TranscriptCreateOrConnectWithoutStudentInput[]
    createMany?: TranscriptCreateManyStudentInputEnvelope
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ActivityCreateWithoutStudentInput, ActivityUncheckedCreateWithoutStudentInput> | ActivityCreateWithoutStudentInput[] | ActivityUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutStudentInput | ActivityCreateOrConnectWithoutStudentInput[]
    createMany?: ActivityCreateManyStudentInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type TestScoreUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
  }

  export type AchievementUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
  }

  export type ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ProjectExperienceCreateWithoutStudentInput, ProjectExperienceUncheckedCreateWithoutStudentInput> | ProjectExperienceCreateWithoutStudentInput[] | ProjectExperienceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProjectExperienceCreateOrConnectWithoutStudentInput | ProjectExperienceCreateOrConnectWithoutStudentInput[]
    createMany?: ProjectExperienceCreateManyStudentInputEnvelope
    connect?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
  }

  export type MeetingLogUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<MeetingLogCreateWithoutStudentInput, MeetingLogUncheckedCreateWithoutStudentInput> | MeetingLogCreateWithoutStudentInput[] | MeetingLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutStudentInput | MeetingLogCreateOrConnectWithoutStudentInput[]
    createMany?: MeetingLogCreateManyStudentInputEnvelope
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumGradeLevelFieldUpdateOperationsInput = {
    set?: $Enums.GradeLevel
  }

  export type UserUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    upsert?: UserUpsertWithoutStudentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentInput, UserUpdateWithoutStudentInput>, UserUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateOneWithoutCoordinated_studentsNestedInput = {
    create?: XOR<UserCreateWithoutCoordinated_studentsInput, UserUncheckedCreateWithoutCoordinated_studentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoordinated_studentsInput
    upsert?: UserUpsertWithoutCoordinated_studentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCoordinated_studentsInput, UserUpdateWithoutCoordinated_studentsInput>, UserUncheckedUpdateWithoutCoordinated_studentsInput>
  }

  export type PersonalProfileUpdateOneWithoutStudentNestedInput = {
    create?: XOR<PersonalProfileCreateWithoutStudentInput, PersonalProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalProfileCreateOrConnectWithoutStudentInput
    upsert?: PersonalProfileUpsertWithoutStudentInput
    disconnect?: PersonalProfileWhereInput | boolean
    delete?: PersonalProfileWhereInput | boolean
    connect?: PersonalProfileWhereUniqueInput
    update?: XOR<XOR<PersonalProfileUpdateToOneWithWhereWithoutStudentInput, PersonalProfileUpdateWithoutStudentInput>, PersonalProfileUncheckedUpdateWithoutStudentInput>
  }

  export type AcademicProfileUpdateOneWithoutStudentNestedInput = {
    create?: XOR<AcademicProfileCreateWithoutStudentInput, AcademicProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AcademicProfileCreateOrConnectWithoutStudentInput
    upsert?: AcademicProfileUpsertWithoutStudentInput
    disconnect?: AcademicProfileWhereInput | boolean
    delete?: AcademicProfileWhereInput | boolean
    connect?: AcademicProfileWhereUniqueInput
    update?: XOR<XOR<AcademicProfileUpdateToOneWithWhereWithoutStudentInput, AcademicProfileUpdateWithoutStudentInput>, AcademicProfileUncheckedUpdateWithoutStudentInput>
  }

  export type TranscriptUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TranscriptCreateWithoutStudentInput, TranscriptUncheckedCreateWithoutStudentInput> | TranscriptCreateWithoutStudentInput[] | TranscriptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutStudentInput | TranscriptCreateOrConnectWithoutStudentInput[]
    upsert?: TranscriptUpsertWithWhereUniqueWithoutStudentInput | TranscriptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TranscriptCreateManyStudentInputEnvelope
    set?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    disconnect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    delete?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    update?: TranscriptUpdateWithWhereUniqueWithoutStudentInput | TranscriptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TranscriptUpdateManyWithWhereWithoutStudentInput | TranscriptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
  }

  export type ActivityUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ActivityCreateWithoutStudentInput, ActivityUncheckedCreateWithoutStudentInput> | ActivityCreateWithoutStudentInput[] | ActivityUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutStudentInput | ActivityCreateOrConnectWithoutStudentInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutStudentInput | ActivityUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ActivityCreateManyStudentInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutStudentInput | ActivityUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutStudentInput | ActivityUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TestScoreUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutStudentInput | TestScoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutStudentInput | TestScoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutStudentInput | TestScoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type AchievementUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    upsert?: AchievementUpsertWithWhereUniqueWithoutStudentInput | AchievementUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    set?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    disconnect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    delete?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    update?: AchievementUpdateWithWhereUniqueWithoutStudentInput | AchievementUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AchievementUpdateManyWithWhereWithoutStudentInput | AchievementUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
  }

  export type ProjectExperienceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ProjectExperienceCreateWithoutStudentInput, ProjectExperienceUncheckedCreateWithoutStudentInput> | ProjectExperienceCreateWithoutStudentInput[] | ProjectExperienceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProjectExperienceCreateOrConnectWithoutStudentInput | ProjectExperienceCreateOrConnectWithoutStudentInput[]
    upsert?: ProjectExperienceUpsertWithWhereUniqueWithoutStudentInput | ProjectExperienceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ProjectExperienceCreateManyStudentInputEnvelope
    set?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    disconnect?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    delete?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    connect?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    update?: ProjectExperienceUpdateWithWhereUniqueWithoutStudentInput | ProjectExperienceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ProjectExperienceUpdateManyWithWhereWithoutStudentInput | ProjectExperienceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ProjectExperienceScalarWhereInput | ProjectExperienceScalarWhereInput[]
  }

  export type MeetingLogUpdateManyWithoutStudentNestedInput = {
    create?: XOR<MeetingLogCreateWithoutStudentInput, MeetingLogUncheckedCreateWithoutStudentInput> | MeetingLogCreateWithoutStudentInput[] | MeetingLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutStudentInput | MeetingLogCreateOrConnectWithoutStudentInput[]
    upsert?: MeetingLogUpsertWithWhereUniqueWithoutStudentInput | MeetingLogUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: MeetingLogCreateManyStudentInputEnvelope
    set?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    disconnect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    delete?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    update?: MeetingLogUpdateWithWhereUniqueWithoutStudentInput | MeetingLogUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: MeetingLogUpdateManyWithWhereWithoutStudentInput | MeetingLogUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: MeetingLogScalarWhereInput | MeetingLogScalarWhereInput[]
  }

  export type PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<PersonalProfileCreateWithoutStudentInput, PersonalProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalProfileCreateOrConnectWithoutStudentInput
    upsert?: PersonalProfileUpsertWithoutStudentInput
    disconnect?: PersonalProfileWhereInput | boolean
    delete?: PersonalProfileWhereInput | boolean
    connect?: PersonalProfileWhereUniqueInput
    update?: XOR<XOR<PersonalProfileUpdateToOneWithWhereWithoutStudentInput, PersonalProfileUpdateWithoutStudentInput>, PersonalProfileUncheckedUpdateWithoutStudentInput>
  }

  export type AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<AcademicProfileCreateWithoutStudentInput, AcademicProfileUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AcademicProfileCreateOrConnectWithoutStudentInput
    upsert?: AcademicProfileUpsertWithoutStudentInput
    disconnect?: AcademicProfileWhereInput | boolean
    delete?: AcademicProfileWhereInput | boolean
    connect?: AcademicProfileWhereUniqueInput
    update?: XOR<XOR<AcademicProfileUpdateToOneWithWhereWithoutStudentInput, AcademicProfileUpdateWithoutStudentInput>, AcademicProfileUncheckedUpdateWithoutStudentInput>
  }

  export type TranscriptUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TranscriptCreateWithoutStudentInput, TranscriptUncheckedCreateWithoutStudentInput> | TranscriptCreateWithoutStudentInput[] | TranscriptUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TranscriptCreateOrConnectWithoutStudentInput | TranscriptCreateOrConnectWithoutStudentInput[]
    upsert?: TranscriptUpsertWithWhereUniqueWithoutStudentInput | TranscriptUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TranscriptCreateManyStudentInputEnvelope
    set?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    disconnect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    delete?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    connect?: TranscriptWhereUniqueInput | TranscriptWhereUniqueInput[]
    update?: TranscriptUpdateWithWhereUniqueWithoutStudentInput | TranscriptUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TranscriptUpdateManyWithWhereWithoutStudentInput | TranscriptUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ActivityCreateWithoutStudentInput, ActivityUncheckedCreateWithoutStudentInput> | ActivityCreateWithoutStudentInput[] | ActivityUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutStudentInput | ActivityCreateOrConnectWithoutStudentInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutStudentInput | ActivityUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ActivityCreateManyStudentInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutStudentInput | ActivityUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutStudentInput | ActivityUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TestScoreUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput> | TestScoreCreateWithoutStudentInput[] | TestScoreUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TestScoreCreateOrConnectWithoutStudentInput | TestScoreCreateOrConnectWithoutStudentInput[]
    upsert?: TestScoreUpsertWithWhereUniqueWithoutStudentInput | TestScoreUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TestScoreCreateManyStudentInputEnvelope
    set?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    disconnect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    delete?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    connect?: TestScoreWhereUniqueInput | TestScoreWhereUniqueInput[]
    update?: TestScoreUpdateWithWhereUniqueWithoutStudentInput | TestScoreUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TestScoreUpdateManyWithWhereWithoutStudentInput | TestScoreUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
  }

  export type AchievementUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    upsert?: AchievementUpsertWithWhereUniqueWithoutStudentInput | AchievementUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    set?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    disconnect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    delete?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    update?: AchievementUpdateWithWhereUniqueWithoutStudentInput | AchievementUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AchievementUpdateManyWithWhereWithoutStudentInput | AchievementUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
  }

  export type ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ProjectExperienceCreateWithoutStudentInput, ProjectExperienceUncheckedCreateWithoutStudentInput> | ProjectExperienceCreateWithoutStudentInput[] | ProjectExperienceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProjectExperienceCreateOrConnectWithoutStudentInput | ProjectExperienceCreateOrConnectWithoutStudentInput[]
    upsert?: ProjectExperienceUpsertWithWhereUniqueWithoutStudentInput | ProjectExperienceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ProjectExperienceCreateManyStudentInputEnvelope
    set?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    disconnect?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    delete?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    connect?: ProjectExperienceWhereUniqueInput | ProjectExperienceWhereUniqueInput[]
    update?: ProjectExperienceUpdateWithWhereUniqueWithoutStudentInput | ProjectExperienceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ProjectExperienceUpdateManyWithWhereWithoutStudentInput | ProjectExperienceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ProjectExperienceScalarWhereInput | ProjectExperienceScalarWhereInput[]
  }

  export type MeetingLogUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<MeetingLogCreateWithoutStudentInput, MeetingLogUncheckedCreateWithoutStudentInput> | MeetingLogCreateWithoutStudentInput[] | MeetingLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MeetingLogCreateOrConnectWithoutStudentInput | MeetingLogCreateOrConnectWithoutStudentInput[]
    upsert?: MeetingLogUpsertWithWhereUniqueWithoutStudentInput | MeetingLogUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: MeetingLogCreateManyStudentInputEnvelope
    set?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    disconnect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    delete?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    connect?: MeetingLogWhereUniqueInput | MeetingLogWhereUniqueInput[]
    update?: MeetingLogUpdateWithWhereUniqueWithoutStudentInput | MeetingLogUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: MeetingLogUpdateManyWithWhereWithoutStudentInput | MeetingLogUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: MeetingLogScalarWhereInput | MeetingLogScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutPersonal_profileInput = {
    create?: XOR<StudentCreateWithoutPersonal_profileInput, StudentUncheckedCreateWithoutPersonal_profileInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPersonal_profileInput
    connect?: StudentWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StudentUpdateOneRequiredWithoutPersonal_profileNestedInput = {
    create?: XOR<StudentCreateWithoutPersonal_profileInput, StudentUncheckedCreateWithoutPersonal_profileInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPersonal_profileInput
    upsert?: StudentUpsertWithoutPersonal_profileInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPersonal_profileInput, StudentUpdateWithoutPersonal_profileInput>, StudentUncheckedUpdateWithoutPersonal_profileInput>
  }

  export type StudentCreateNestedOneWithoutAcademic_profileInput = {
    create?: XOR<StudentCreateWithoutAcademic_profileInput, StudentUncheckedCreateWithoutAcademic_profileInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAcademic_profileInput
    connect?: StudentWhereUniqueInput
  }

  export type EnumCurriculumTypeFieldUpdateOperationsInput = {
    set?: $Enums.CurriculumType
  }

  export type EnumGradingSystemTypeFieldUpdateOperationsInput = {
    set?: $Enums.GradingSystemType
  }

  export type StudentUpdateOneRequiredWithoutAcademic_profileNestedInput = {
    create?: XOR<StudentCreateWithoutAcademic_profileInput, StudentUncheckedCreateWithoutAcademic_profileInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAcademic_profileInput
    upsert?: StudentUpsertWithoutAcademic_profileInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAcademic_profileInput, StudentUpdateWithoutAcademic_profileInput>, StudentUncheckedUpdateWithoutAcademic_profileInput>
  }

  export type StudentCreateNestedOneWithoutTranscriptsInput = {
    create?: XOR<StudentCreateWithoutTranscriptsInput, StudentUncheckedCreateWithoutTranscriptsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTranscriptsInput
    connect?: StudentWhereUniqueInput
  }

  export type EnumSemesterFieldUpdateOperationsInput = {
    set?: $Enums.Semester
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumHonorsLevelFieldUpdateOperationsInput = {
    set?: $Enums.HonorsLevel
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StudentUpdateOneRequiredWithoutTranscriptsNestedInput = {
    create?: XOR<StudentCreateWithoutTranscriptsInput, StudentUncheckedCreateWithoutTranscriptsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTranscriptsInput
    upsert?: StudentUpsertWithoutTranscriptsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutTranscriptsInput, StudentUpdateWithoutTranscriptsInput>, StudentUncheckedUpdateWithoutTranscriptsInput>
  }

  export type StudentCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<StudentCreateWithoutActivitiesInput, StudentUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutActivitiesInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<StudentCreateWithoutActivitiesInput, StudentUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutActivitiesInput
    upsert?: StudentUpsertWithoutActivitiesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutActivitiesInput, StudentUpdateWithoutActivitiesInput>, StudentUncheckedUpdateWithoutActivitiesInput>
  }

  export type StudentCreateNestedOneWithoutTest_scoresInput = {
    create?: XOR<StudentCreateWithoutTest_scoresInput, StudentUncheckedCreateWithoutTest_scoresInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTest_scoresInput
    connect?: StudentWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentUpdateOneRequiredWithoutTest_scoresNestedInput = {
    create?: XOR<StudentCreateWithoutTest_scoresInput, StudentUncheckedCreateWithoutTest_scoresInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTest_scoresInput
    upsert?: StudentUpsertWithoutTest_scoresInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutTest_scoresInput, StudentUpdateWithoutTest_scoresInput>, StudentUncheckedUpdateWithoutTest_scoresInput>
  }

  export type StudentCreateNestedOneWithoutAchievementsInput = {
    create?: XOR<StudentCreateWithoutAchievementsInput, StudentUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAchievementsInput
    connect?: StudentWhereUniqueInput
  }

  export type EnumAchievementTypeFieldUpdateOperationsInput = {
    set?: $Enums.AchievementType
  }

  export type NullableEnumGradeLevelFieldUpdateOperationsInput = {
    set?: $Enums.GradeLevel | null
  }

  export type NullableEnumRecognitionLevelFieldUpdateOperationsInput = {
    set?: $Enums.RecognitionLevel | null
  }

  export type StudentUpdateOneRequiredWithoutAchievementsNestedInput = {
    create?: XOR<StudentCreateWithoutAchievementsInput, StudentUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAchievementsInput
    upsert?: StudentUpsertWithoutAchievementsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAchievementsInput, StudentUpdateWithoutAchievementsInput>, StudentUncheckedUpdateWithoutAchievementsInput>
  }

  export type StudentCreateNestedOneWithoutProject_experiencesInput = {
    create?: XOR<StudentCreateWithoutProject_experiencesInput, StudentUncheckedCreateWithoutProject_experiencesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProject_experiencesInput
    connect?: StudentWhereUniqueInput
  }

  export type EnumExperienceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExperienceType
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type StudentUpdateOneRequiredWithoutProject_experiencesNestedInput = {
    create?: XOR<StudentCreateWithoutProject_experiencesInput, StudentUncheckedCreateWithoutProject_experiencesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProject_experiencesInput
    upsert?: StudentUpsertWithoutProject_experiencesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutProject_experiencesInput, StudentUpdateWithoutProject_experiencesInput>, StudentUncheckedUpdateWithoutProject_experiencesInput>
  }

  export type StudentCreateNestedOneWithoutMeeting_logsInput = {
    create?: XOR<StudentCreateWithoutMeeting_logsInput, StudentUncheckedCreateWithoutMeeting_logsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutMeeting_logsInput
    connect?: StudentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMeeting_logsInput = {
    create?: XOR<UserCreateWithoutMeeting_logsInput, UserUncheckedCreateWithoutMeeting_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeeting_logsInput
    connect?: UserWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutMeeting_logsNestedInput = {
    create?: XOR<StudentCreateWithoutMeeting_logsInput, StudentUncheckedCreateWithoutMeeting_logsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutMeeting_logsInput
    upsert?: StudentUpsertWithoutMeeting_logsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutMeeting_logsInput, StudentUpdateWithoutMeeting_logsInput>, StudentUncheckedUpdateWithoutMeeting_logsInput>
  }

  export type UserUpdateOneRequiredWithoutMeeting_logsNestedInput = {
    create?: XOR<UserCreateWithoutMeeting_logsInput, UserUncheckedCreateWithoutMeeting_logsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMeeting_logsInput
    upsert?: UserUpsertWithoutMeeting_logsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMeeting_logsInput, UserUpdateWithoutMeeting_logsInput>, UserUncheckedUpdateWithoutMeeting_logsInput>
  }

  export type NullableEnumCurriculumTypeFieldUpdateOperationsInput = {
    set?: $Enums.CurriculumType | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumGradeLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel>
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeLevelFilter<$PrismaModel> | $Enums.GradeLevel
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGradeLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel>
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumGradeLevelWithAggregatesFilter<$PrismaModel> | $Enums.GradeLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradeLevelFilter<$PrismaModel>
    _max?: NestedEnumGradeLevelFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumCurriculumTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurriculumTypeFilter<$PrismaModel> | $Enums.CurriculumType
  }

  export type NestedEnumGradingSystemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GradingSystemType | EnumGradingSystemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradingSystemTypeFilter<$PrismaModel> | $Enums.GradingSystemType
  }

  export type NestedEnumCurriculumTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurriculumTypeWithAggregatesFilter<$PrismaModel> | $Enums.CurriculumType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurriculumTypeFilter<$PrismaModel>
    _max?: NestedEnumCurriculumTypeFilter<$PrismaModel>
  }

  export type NestedEnumGradingSystemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GradingSystemType | EnumGradingSystemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GradingSystemType[] | ListEnumGradingSystemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGradingSystemTypeWithAggregatesFilter<$PrismaModel> | $Enums.GradingSystemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGradingSystemTypeFilter<$PrismaModel>
    _max?: NestedEnumGradingSystemTypeFilter<$PrismaModel>
  }

  export type NestedEnumSemesterFilter<$PrismaModel = never> = {
    equals?: $Enums.Semester | EnumSemesterFieldRefInput<$PrismaModel>
    in?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    notIn?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    not?: NestedEnumSemesterFilter<$PrismaModel> | $Enums.Semester
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumHonorsLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorsLevel | EnumHonorsLevelFieldRefInput<$PrismaModel>
    in?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorsLevelFilter<$PrismaModel> | $Enums.HonorsLevel
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumSemesterWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Semester | EnumSemesterFieldRefInput<$PrismaModel>
    in?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    notIn?: $Enums.Semester[] | ListEnumSemesterFieldRefInput<$PrismaModel>
    not?: NestedEnumSemesterWithAggregatesFilter<$PrismaModel> | $Enums.Semester
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSemesterFilter<$PrismaModel>
    _max?: NestedEnumSemesterFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumHonorsLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorsLevel | EnumHonorsLevelFieldRefInput<$PrismaModel>
    in?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorsLevel[] | ListEnumHonorsLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorsLevelWithAggregatesFilter<$PrismaModel> | $Enums.HonorsLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHonorsLevelFilter<$PrismaModel>
    _max?: NestedEnumHonorsLevelFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAchievementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeFilter<$PrismaModel> | $Enums.AchievementType
  }

  export type NestedEnumGradeLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGradeLevelNullableFilter<$PrismaModel> | $Enums.GradeLevel | null
  }

  export type NestedEnumRecognitionLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RecognitionLevel | EnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecognitionLevelNullableFilter<$PrismaModel> | $Enums.RecognitionLevel | null
  }

  export type NestedEnumAchievementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeWithAggregatesFilter<$PrismaModel> | $Enums.AchievementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAchievementTypeFilter<$PrismaModel>
    _max?: NestedEnumAchievementTypeFilter<$PrismaModel>
  }

  export type NestedEnumGradeLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GradeLevel | EnumGradeLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GradeLevel[] | ListEnumGradeLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGradeLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.GradeLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGradeLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumGradeLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumRecognitionLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecognitionLevel | EnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RecognitionLevel[] | ListEnumRecognitionLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRecognitionLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.RecognitionLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRecognitionLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumRecognitionLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumExperienceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeFilter<$PrismaModel> | $Enums.ExperienceType
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedEnumExperienceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceType | EnumExperienceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceType[] | ListEnumExperienceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperienceTypeFilter<$PrismaModel>
    _max?: NestedEnumExperienceTypeFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedEnumCurriculumTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurriculumTypeNullableFilter<$PrismaModel> | $Enums.CurriculumType | null
  }

  export type NestedEnumCurriculumTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurriculumType | EnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurriculumType[] | ListEnumCurriculumTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurriculumTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CurriculumType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCurriculumTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCurriculumTypeNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutOrganizationInput = {
    id?: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    student?: StudentCreateNestedOneWithoutUserInput
    coordinated_students?: StudentCreateNestedManyWithoutPrimary_coordinatorInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutCoordinatorInput
  }

  export type UserUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    coordinated_students?: StudentUncheckedCreateNestedManyWithoutPrimary_coordinatorInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutCoordinatorInput
  }

  export type UserCreateOrConnectWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserCreateManyOrganizationInputEnvelope = {
    data: UserCreateManyOrganizationInput | UserCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    organization_id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
  }

  export type OrganizationCreateWithoutUsersInput = {
    id?: string
    name: string
    logo_url?: string | null
    primary_color?: string
    created_at?: Date | string
  }

  export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    logo_url?: string | null
    primary_color?: string
    created_at?: Date | string
  }

  export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
  }

  export type StudentCreateWithoutUserInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutUserInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutUserInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
  }

  export type StudentCreateWithoutPrimary_coordinatorInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPrimary_coordinatorInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPrimary_coordinatorInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPrimary_coordinatorInput, StudentUncheckedCreateWithoutPrimary_coordinatorInput>
  }

  export type StudentCreateManyPrimary_coordinatorInputEnvelope = {
    data: StudentCreateManyPrimary_coordinatorInput | StudentCreateManyPrimary_coordinatorInput[]
    skipDuplicates?: boolean
  }

  export type MeetingLogCreateWithoutCoordinatorInput = {
    id?: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
    student: StudentCreateNestedOneWithoutMeeting_logsInput
  }

  export type MeetingLogUncheckedCreateWithoutCoordinatorInput = {
    id?: string
    student_id: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
  }

  export type MeetingLogCreateOrConnectWithoutCoordinatorInput = {
    where: MeetingLogWhereUniqueInput
    create: XOR<MeetingLogCreateWithoutCoordinatorInput, MeetingLogUncheckedCreateWithoutCoordinatorInput>
  }

  export type MeetingLogCreateManyCoordinatorInputEnvelope = {
    data: MeetingLogCreateManyCoordinatorInput | MeetingLogCreateManyCoordinatorInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutUsersInput = {
    update: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    primary_color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    primary_color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUpsertWithoutUserInput = {
    update: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
  }

  export type StudentUpdateWithoutUserInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutUserInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUpsertWithWhereUniqueWithoutPrimary_coordinatorInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutPrimary_coordinatorInput, StudentUncheckedUpdateWithoutPrimary_coordinatorInput>
    create: XOR<StudentCreateWithoutPrimary_coordinatorInput, StudentUncheckedCreateWithoutPrimary_coordinatorInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutPrimary_coordinatorInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutPrimary_coordinatorInput, StudentUncheckedUpdateWithoutPrimary_coordinatorInput>
  }

  export type StudentUpdateManyWithWhereWithoutPrimary_coordinatorInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutPrimary_coordinatorInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    user_id?: StringFilter<"Student"> | string
    graduation_year?: IntFilter<"Student"> | number
    current_grade?: EnumGradeLevelFilter<"Student"> | $Enums.GradeLevel
    primary_coordinator_id?: StringNullableFilter<"Student"> | string | null
    profile_completion_pct?: IntFilter<"Student"> | number
  }

  export type MeetingLogUpsertWithWhereUniqueWithoutCoordinatorInput = {
    where: MeetingLogWhereUniqueInput
    update: XOR<MeetingLogUpdateWithoutCoordinatorInput, MeetingLogUncheckedUpdateWithoutCoordinatorInput>
    create: XOR<MeetingLogCreateWithoutCoordinatorInput, MeetingLogUncheckedCreateWithoutCoordinatorInput>
  }

  export type MeetingLogUpdateWithWhereUniqueWithoutCoordinatorInput = {
    where: MeetingLogWhereUniqueInput
    data: XOR<MeetingLogUpdateWithoutCoordinatorInput, MeetingLogUncheckedUpdateWithoutCoordinatorInput>
  }

  export type MeetingLogUpdateManyWithWhereWithoutCoordinatorInput = {
    where: MeetingLogScalarWhereInput
    data: XOR<MeetingLogUpdateManyMutationInput, MeetingLogUncheckedUpdateManyWithoutCoordinatorInput>
  }

  export type MeetingLogScalarWhereInput = {
    AND?: MeetingLogScalarWhereInput | MeetingLogScalarWhereInput[]
    OR?: MeetingLogScalarWhereInput[]
    NOT?: MeetingLogScalarWhereInput | MeetingLogScalarWhereInput[]
    id?: StringFilter<"MeetingLog"> | string
    student_id?: StringFilter<"MeetingLog"> | string
    coordinator_id?: StringFilter<"MeetingLog"> | string
    meeting_date?: DateTimeFilter<"MeetingLog"> | Date | string
    duration_minutes?: IntFilter<"MeetingLog"> | number
    notes?: StringFilter<"MeetingLog"> | string
    action_items?: StringNullableFilter<"MeetingLog"> | string | null
    created_at?: DateTimeFilter<"MeetingLog"> | Date | string
  }

  export type UserCreateWithoutStudentInput = {
    id?: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    coordinated_students?: StudentCreateNestedManyWithoutPrimary_coordinatorInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutCoordinatorInput
  }

  export type UserUncheckedCreateWithoutStudentInput = {
    id?: string
    organization_id: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    coordinated_students?: StudentUncheckedCreateNestedManyWithoutPrimary_coordinatorInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutCoordinatorInput
  }

  export type UserCreateOrConnectWithoutStudentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
  }

  export type UserCreateWithoutCoordinated_studentsInput = {
    id?: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    student?: StudentCreateNestedOneWithoutUserInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutCoordinatorInput
  }

  export type UserUncheckedCreateWithoutCoordinated_studentsInput = {
    id?: string
    organization_id: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutCoordinatorInput
  }

  export type UserCreateOrConnectWithoutCoordinated_studentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCoordinated_studentsInput, UserUncheckedCreateWithoutCoordinated_studentsInput>
  }

  export type PersonalProfileCreateWithoutStudentInput = {
    preferred_name?: string | null
    date_of_birth?: Date | string | null
    phone?: string | null
    current_school?: string | null
    school_location?: string | null
    parent_name?: string | null
    parent_email?: string | null
    parent_phone?: string | null
    created_at?: Date | string
  }

  export type PersonalProfileUncheckedCreateWithoutStudentInput = {
    preferred_name?: string | null
    date_of_birth?: Date | string | null
    phone?: string | null
    current_school?: string | null
    school_location?: string | null
    parent_name?: string | null
    parent_email?: string | null
    parent_phone?: string | null
    created_at?: Date | string
  }

  export type PersonalProfileCreateOrConnectWithoutStudentInput = {
    where: PersonalProfileWhereUniqueInput
    create: XOR<PersonalProfileCreateWithoutStudentInput, PersonalProfileUncheckedCreateWithoutStudentInput>
  }

  export type AcademicProfileCreateWithoutStudentInput = {
    curriculum_type: $Enums.CurriculumType
    grading_system_type: $Enums.GradingSystemType
    current_gpa?: string | null
    created_at?: Date | string
  }

  export type AcademicProfileUncheckedCreateWithoutStudentInput = {
    curriculum_type: $Enums.CurriculumType
    grading_system_type: $Enums.GradingSystemType
    current_gpa?: string | null
    created_at?: Date | string
  }

  export type AcademicProfileCreateOrConnectWithoutStudentInput = {
    where: AcademicProfileWhereUniqueInput
    create: XOR<AcademicProfileCreateWithoutStudentInput, AcademicProfileUncheckedCreateWithoutStudentInput>
  }

  export type TranscriptCreateWithoutStudentInput = {
    id?: string
    course_name: string
    grade_level: $Enums.GradeLevel
    semester: $Enums.Semester
    grade_value: string
    credits?: number | null
    honors_level?: $Enums.HonorsLevel
    is_board_exam?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TranscriptUncheckedCreateWithoutStudentInput = {
    id?: string
    course_name: string
    grade_level: $Enums.GradeLevel
    semester: $Enums.Semester
    grade_value: string
    credits?: number | null
    honors_level?: $Enums.HonorsLevel
    is_board_exam?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TranscriptCreateOrConnectWithoutStudentInput = {
    where: TranscriptWhereUniqueInput
    create: XOR<TranscriptCreateWithoutStudentInput, TranscriptUncheckedCreateWithoutStudentInput>
  }

  export type TranscriptCreateManyStudentInputEnvelope = {
    data: TranscriptCreateManyStudentInput | TranscriptCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ActivityCreateWithoutStudentInput = {
    id?: string
    activity_name: string
    category: string
    role?: string | null
    grade_levels: JsonNullValueInput | InputJsonValue
    hours_per_week: number
    weeks_per_year: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityUncheckedCreateWithoutStudentInput = {
    id?: string
    activity_name: string
    category: string
    role?: string | null
    grade_levels: JsonNullValueInput | InputJsonValue
    hours_per_week: number
    weeks_per_year: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityCreateOrConnectWithoutStudentInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutStudentInput, ActivityUncheckedCreateWithoutStudentInput>
  }

  export type ActivityCreateManyStudentInputEnvelope = {
    data: ActivityCreateManyStudentInput | ActivityCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type TestScoreCreateWithoutStudentInput = {
    id?: string
    test_type: string
    test_name: string
    test_date: Date | string
    composite_score?: number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TestScoreUncheckedCreateWithoutStudentInput = {
    id?: string
    test_type: string
    test_name: string
    test_date: Date | string
    composite_score?: number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TestScoreCreateOrConnectWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    create: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput>
  }

  export type TestScoreCreateManyStudentInputEnvelope = {
    data: TestScoreCreateManyStudentInput | TestScoreCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AchievementCreateWithoutStudentInput = {
    id?: string
    achievement_type: $Enums.AchievementType
    title: string
    organization?: string | null
    grade_level?: $Enums.GradeLevel | null
    date_achieved?: Date | string | null
    description?: string | null
    metrics?: string | null
    recognition_level?: $Enums.RecognitionLevel | null
    verifiable_link?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AchievementUncheckedCreateWithoutStudentInput = {
    id?: string
    achievement_type: $Enums.AchievementType
    title: string
    organization?: string | null
    grade_level?: $Enums.GradeLevel | null
    date_achieved?: Date | string | null
    description?: string | null
    metrics?: string | null
    recognition_level?: $Enums.RecognitionLevel | null
    verifiable_link?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AchievementCreateOrConnectWithoutStudentInput = {
    where: AchievementWhereUniqueInput
    create: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput>
  }

  export type AchievementCreateManyStudentInputEnvelope = {
    data: AchievementCreateManyStudentInput | AchievementCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ProjectExperienceCreateWithoutStudentInput = {
    id?: string
    experience_type: $Enums.ExperienceType
    title: string
    organization?: string | null
    location?: string | null
    start_date: Date | string
    end_date?: Date | string | null
    is_ongoing?: boolean
    role_title?: string | null
    description?: string | null
    outcomes?: string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: string | null
    mentor_name?: string | null
    mentor_email?: string | null
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectExperienceUncheckedCreateWithoutStudentInput = {
    id?: string
    experience_type: $Enums.ExperienceType
    title: string
    organization?: string | null
    location?: string | null
    start_date: Date | string
    end_date?: Date | string | null
    is_ongoing?: boolean
    role_title?: string | null
    description?: string | null
    outcomes?: string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: string | null
    mentor_name?: string | null
    mentor_email?: string | null
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectExperienceCreateOrConnectWithoutStudentInput = {
    where: ProjectExperienceWhereUniqueInput
    create: XOR<ProjectExperienceCreateWithoutStudentInput, ProjectExperienceUncheckedCreateWithoutStudentInput>
  }

  export type ProjectExperienceCreateManyStudentInputEnvelope = {
    data: ProjectExperienceCreateManyStudentInput | ProjectExperienceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type MeetingLogCreateWithoutStudentInput = {
    id?: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
    coordinator: UserCreateNestedOneWithoutMeeting_logsInput
  }

  export type MeetingLogUncheckedCreateWithoutStudentInput = {
    id?: string
    coordinator_id: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
  }

  export type MeetingLogCreateOrConnectWithoutStudentInput = {
    where: MeetingLogWhereUniqueInput
    create: XOR<MeetingLogCreateWithoutStudentInput, MeetingLogUncheckedCreateWithoutStudentInput>
  }

  export type MeetingLogCreateManyStudentInputEnvelope = {
    data: MeetingLogCreateManyStudentInput | MeetingLogCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStudentInput = {
    update: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    coordinated_students?: StudentUpdateManyWithoutPrimary_coordinatorNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutCoordinatorNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    coordinated_students?: StudentUncheckedUpdateManyWithoutPrimary_coordinatorNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutCoordinatorNestedInput
  }

  export type UserUpsertWithoutCoordinated_studentsInput = {
    update: XOR<UserUpdateWithoutCoordinated_studentsInput, UserUncheckedUpdateWithoutCoordinated_studentsInput>
    create: XOR<UserCreateWithoutCoordinated_studentsInput, UserUncheckedCreateWithoutCoordinated_studentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCoordinated_studentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCoordinated_studentsInput, UserUncheckedUpdateWithoutCoordinated_studentsInput>
  }

  export type UserUpdateWithoutCoordinated_studentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutCoordinatorNestedInput
  }

  export type UserUncheckedUpdateWithoutCoordinated_studentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutCoordinatorNestedInput
  }

  export type PersonalProfileUpsertWithoutStudentInput = {
    update: XOR<PersonalProfileUpdateWithoutStudentInput, PersonalProfileUncheckedUpdateWithoutStudentInput>
    create: XOR<PersonalProfileCreateWithoutStudentInput, PersonalProfileUncheckedCreateWithoutStudentInput>
    where?: PersonalProfileWhereInput
  }

  export type PersonalProfileUpdateToOneWithWhereWithoutStudentInput = {
    where?: PersonalProfileWhereInput
    data: XOR<PersonalProfileUpdateWithoutStudentInput, PersonalProfileUncheckedUpdateWithoutStudentInput>
  }

  export type PersonalProfileUpdateWithoutStudentInput = {
    preferred_name?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    current_school?: NullableStringFieldUpdateOperationsInput | string | null
    school_location?: NullableStringFieldUpdateOperationsInput | string | null
    parent_name?: NullableStringFieldUpdateOperationsInput | string | null
    parent_email?: NullableStringFieldUpdateOperationsInput | string | null
    parent_phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalProfileUncheckedUpdateWithoutStudentInput = {
    preferred_name?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    current_school?: NullableStringFieldUpdateOperationsInput | string | null
    school_location?: NullableStringFieldUpdateOperationsInput | string | null
    parent_name?: NullableStringFieldUpdateOperationsInput | string | null
    parent_email?: NullableStringFieldUpdateOperationsInput | string | null
    parent_phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicProfileUpsertWithoutStudentInput = {
    update: XOR<AcademicProfileUpdateWithoutStudentInput, AcademicProfileUncheckedUpdateWithoutStudentInput>
    create: XOR<AcademicProfileCreateWithoutStudentInput, AcademicProfileUncheckedCreateWithoutStudentInput>
    where?: AcademicProfileWhereInput
  }

  export type AcademicProfileUpdateToOneWithWhereWithoutStudentInput = {
    where?: AcademicProfileWhereInput
    data: XOR<AcademicProfileUpdateWithoutStudentInput, AcademicProfileUncheckedUpdateWithoutStudentInput>
  }

  export type AcademicProfileUpdateWithoutStudentInput = {
    curriculum_type?: EnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFieldUpdateOperationsInput | $Enums.GradingSystemType
    current_gpa?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicProfileUncheckedUpdateWithoutStudentInput = {
    curriculum_type?: EnumCurriculumTypeFieldUpdateOperationsInput | $Enums.CurriculumType
    grading_system_type?: EnumGradingSystemTypeFieldUpdateOperationsInput | $Enums.GradingSystemType
    current_gpa?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptUpsertWithWhereUniqueWithoutStudentInput = {
    where: TranscriptWhereUniqueInput
    update: XOR<TranscriptUpdateWithoutStudentInput, TranscriptUncheckedUpdateWithoutStudentInput>
    create: XOR<TranscriptCreateWithoutStudentInput, TranscriptUncheckedCreateWithoutStudentInput>
  }

  export type TranscriptUpdateWithWhereUniqueWithoutStudentInput = {
    where: TranscriptWhereUniqueInput
    data: XOR<TranscriptUpdateWithoutStudentInput, TranscriptUncheckedUpdateWithoutStudentInput>
  }

  export type TranscriptUpdateManyWithWhereWithoutStudentInput = {
    where: TranscriptScalarWhereInput
    data: XOR<TranscriptUpdateManyMutationInput, TranscriptUncheckedUpdateManyWithoutStudentInput>
  }

  export type TranscriptScalarWhereInput = {
    AND?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
    OR?: TranscriptScalarWhereInput[]
    NOT?: TranscriptScalarWhereInput | TranscriptScalarWhereInput[]
    id?: StringFilter<"Transcript"> | string
    student_id?: StringFilter<"Transcript"> | string
    course_name?: StringFilter<"Transcript"> | string
    grade_level?: EnumGradeLevelFilter<"Transcript"> | $Enums.GradeLevel
    semester?: EnumSemesterFilter<"Transcript"> | $Enums.Semester
    grade_value?: StringFilter<"Transcript"> | string
    credits?: FloatNullableFilter<"Transcript"> | number | null
    honors_level?: EnumHonorsLevelFilter<"Transcript"> | $Enums.HonorsLevel
    is_board_exam?: BoolFilter<"Transcript"> | boolean
    created_at?: DateTimeFilter<"Transcript"> | Date | string
    updated_at?: DateTimeFilter<"Transcript"> | Date | string
  }

  export type ActivityUpsertWithWhereUniqueWithoutStudentInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutStudentInput, ActivityUncheckedUpdateWithoutStudentInput>
    create: XOR<ActivityCreateWithoutStudentInput, ActivityUncheckedCreateWithoutStudentInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutStudentInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutStudentInput, ActivityUncheckedUpdateWithoutStudentInput>
  }

  export type ActivityUpdateManyWithWhereWithoutStudentInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutStudentInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: StringFilter<"Activity"> | string
    student_id?: StringFilter<"Activity"> | string
    activity_name?: StringFilter<"Activity"> | string
    category?: StringFilter<"Activity"> | string
    role?: StringNullableFilter<"Activity"> | string | null
    grade_levels?: JsonFilter<"Activity">
    hours_per_week?: IntFilter<"Activity"> | number
    weeks_per_year?: IntFilter<"Activity"> | number
    description?: StringNullableFilter<"Activity"> | string | null
    created_at?: DateTimeFilter<"Activity"> | Date | string
    updated_at?: DateTimeFilter<"Activity"> | Date | string
  }

  export type TestScoreUpsertWithWhereUniqueWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    update: XOR<TestScoreUpdateWithoutStudentInput, TestScoreUncheckedUpdateWithoutStudentInput>
    create: XOR<TestScoreCreateWithoutStudentInput, TestScoreUncheckedCreateWithoutStudentInput>
  }

  export type TestScoreUpdateWithWhereUniqueWithoutStudentInput = {
    where: TestScoreWhereUniqueInput
    data: XOR<TestScoreUpdateWithoutStudentInput, TestScoreUncheckedUpdateWithoutStudentInput>
  }

  export type TestScoreUpdateManyWithWhereWithoutStudentInput = {
    where: TestScoreScalarWhereInput
    data: XOR<TestScoreUpdateManyMutationInput, TestScoreUncheckedUpdateManyWithoutStudentInput>
  }

  export type TestScoreScalarWhereInput = {
    AND?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
    OR?: TestScoreScalarWhereInput[]
    NOT?: TestScoreScalarWhereInput | TestScoreScalarWhereInput[]
    id?: StringFilter<"TestScore"> | string
    student_id?: StringFilter<"TestScore"> | string
    test_type?: StringFilter<"TestScore"> | string
    test_name?: StringFilter<"TestScore"> | string
    test_date?: DateTimeFilter<"TestScore"> | Date | string
    composite_score?: IntNullableFilter<"TestScore"> | number | null
    section_scores?: JsonNullableFilter<"TestScore">
    created_at?: DateTimeFilter<"TestScore"> | Date | string
    updated_at?: DateTimeFilter<"TestScore"> | Date | string
  }

  export type AchievementUpsertWithWhereUniqueWithoutStudentInput = {
    where: AchievementWhereUniqueInput
    update: XOR<AchievementUpdateWithoutStudentInput, AchievementUncheckedUpdateWithoutStudentInput>
    create: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput>
  }

  export type AchievementUpdateWithWhereUniqueWithoutStudentInput = {
    where: AchievementWhereUniqueInput
    data: XOR<AchievementUpdateWithoutStudentInput, AchievementUncheckedUpdateWithoutStudentInput>
  }

  export type AchievementUpdateManyWithWhereWithoutStudentInput = {
    where: AchievementScalarWhereInput
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyWithoutStudentInput>
  }

  export type AchievementScalarWhereInput = {
    AND?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
    OR?: AchievementScalarWhereInput[]
    NOT?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
    id?: StringFilter<"Achievement"> | string
    student_id?: StringFilter<"Achievement"> | string
    achievement_type?: EnumAchievementTypeFilter<"Achievement"> | $Enums.AchievementType
    title?: StringFilter<"Achievement"> | string
    organization?: StringNullableFilter<"Achievement"> | string | null
    grade_level?: EnumGradeLevelNullableFilter<"Achievement"> | $Enums.GradeLevel | null
    date_achieved?: DateTimeNullableFilter<"Achievement"> | Date | string | null
    description?: StringNullableFilter<"Achievement"> | string | null
    metrics?: StringNullableFilter<"Achievement"> | string | null
    recognition_level?: EnumRecognitionLevelNullableFilter<"Achievement"> | $Enums.RecognitionLevel | null
    verifiable_link?: StringNullableFilter<"Achievement"> | string | null
    created_at?: DateTimeFilter<"Achievement"> | Date | string
    updated_at?: DateTimeFilter<"Achievement"> | Date | string
  }

  export type ProjectExperienceUpsertWithWhereUniqueWithoutStudentInput = {
    where: ProjectExperienceWhereUniqueInput
    update: XOR<ProjectExperienceUpdateWithoutStudentInput, ProjectExperienceUncheckedUpdateWithoutStudentInput>
    create: XOR<ProjectExperienceCreateWithoutStudentInput, ProjectExperienceUncheckedCreateWithoutStudentInput>
  }

  export type ProjectExperienceUpdateWithWhereUniqueWithoutStudentInput = {
    where: ProjectExperienceWhereUniqueInput
    data: XOR<ProjectExperienceUpdateWithoutStudentInput, ProjectExperienceUncheckedUpdateWithoutStudentInput>
  }

  export type ProjectExperienceUpdateManyWithWhereWithoutStudentInput = {
    where: ProjectExperienceScalarWhereInput
    data: XOR<ProjectExperienceUpdateManyMutationInput, ProjectExperienceUncheckedUpdateManyWithoutStudentInput>
  }

  export type ProjectExperienceScalarWhereInput = {
    AND?: ProjectExperienceScalarWhereInput | ProjectExperienceScalarWhereInput[]
    OR?: ProjectExperienceScalarWhereInput[]
    NOT?: ProjectExperienceScalarWhereInput | ProjectExperienceScalarWhereInput[]
    id?: StringFilter<"ProjectExperience"> | string
    student_id?: StringFilter<"ProjectExperience"> | string
    experience_type?: EnumExperienceTypeFilter<"ProjectExperience"> | $Enums.ExperienceType
    title?: StringFilter<"ProjectExperience"> | string
    organization?: StringNullableFilter<"ProjectExperience"> | string | null
    location?: StringNullableFilter<"ProjectExperience"> | string | null
    start_date?: DateTimeFilter<"ProjectExperience"> | Date | string
    end_date?: DateTimeNullableFilter<"ProjectExperience"> | Date | string | null
    is_ongoing?: BoolFilter<"ProjectExperience"> | boolean
    role_title?: StringNullableFilter<"ProjectExperience"> | string | null
    description?: StringNullableFilter<"ProjectExperience"> | string | null
    outcomes?: StringNullableFilter<"ProjectExperience"> | string | null
    skills_learned?: JsonNullableFilter<"ProjectExperience">
    project_link?: StringNullableFilter<"ProjectExperience"> | string | null
    mentor_name?: StringNullableFilter<"ProjectExperience"> | string | null
    mentor_email?: StringNullableFilter<"ProjectExperience"> | string | null
    status?: EnumProjectStatusFilter<"ProjectExperience"> | $Enums.ProjectStatus
    created_at?: DateTimeFilter<"ProjectExperience"> | Date | string
    updated_at?: DateTimeFilter<"ProjectExperience"> | Date | string
  }

  export type MeetingLogUpsertWithWhereUniqueWithoutStudentInput = {
    where: MeetingLogWhereUniqueInput
    update: XOR<MeetingLogUpdateWithoutStudentInput, MeetingLogUncheckedUpdateWithoutStudentInput>
    create: XOR<MeetingLogCreateWithoutStudentInput, MeetingLogUncheckedCreateWithoutStudentInput>
  }

  export type MeetingLogUpdateWithWhereUniqueWithoutStudentInput = {
    where: MeetingLogWhereUniqueInput
    data: XOR<MeetingLogUpdateWithoutStudentInput, MeetingLogUncheckedUpdateWithoutStudentInput>
  }

  export type MeetingLogUpdateManyWithWhereWithoutStudentInput = {
    where: MeetingLogScalarWhereInput
    data: XOR<MeetingLogUpdateManyMutationInput, MeetingLogUncheckedUpdateManyWithoutStudentInput>
  }

  export type StudentCreateWithoutPersonal_profileInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPersonal_profileInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPersonal_profileInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPersonal_profileInput, StudentUncheckedCreateWithoutPersonal_profileInput>
  }

  export type StudentUpsertWithoutPersonal_profileInput = {
    update: XOR<StudentUpdateWithoutPersonal_profileInput, StudentUncheckedUpdateWithoutPersonal_profileInput>
    create: XOR<StudentCreateWithoutPersonal_profileInput, StudentUncheckedCreateWithoutPersonal_profileInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPersonal_profileInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPersonal_profileInput, StudentUncheckedUpdateWithoutPersonal_profileInput>
  }

  export type StudentUpdateWithoutPersonal_profileInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPersonal_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutAcademic_profileInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAcademic_profileInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAcademic_profileInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAcademic_profileInput, StudentUncheckedCreateWithoutAcademic_profileInput>
  }

  export type StudentUpsertWithoutAcademic_profileInput = {
    update: XOR<StudentUpdateWithoutAcademic_profileInput, StudentUncheckedUpdateWithoutAcademic_profileInput>
    create: XOR<StudentCreateWithoutAcademic_profileInput, StudentUncheckedCreateWithoutAcademic_profileInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAcademic_profileInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAcademic_profileInput, StudentUncheckedUpdateWithoutAcademic_profileInput>
  }

  export type StudentUpdateWithoutAcademic_profileInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAcademic_profileInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutTranscriptsInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTranscriptsInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTranscriptsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTranscriptsInput, StudentUncheckedCreateWithoutTranscriptsInput>
  }

  export type StudentUpsertWithoutTranscriptsInput = {
    update: XOR<StudentUpdateWithoutTranscriptsInput, StudentUncheckedUpdateWithoutTranscriptsInput>
    create: XOR<StudentCreateWithoutTranscriptsInput, StudentUncheckedCreateWithoutTranscriptsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutTranscriptsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutTranscriptsInput, StudentUncheckedUpdateWithoutTranscriptsInput>
  }

  export type StudentUpdateWithoutTranscriptsInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTranscriptsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutActivitiesInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutActivitiesInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutActivitiesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutActivitiesInput, StudentUncheckedCreateWithoutActivitiesInput>
  }

  export type StudentUpsertWithoutActivitiesInput = {
    update: XOR<StudentUpdateWithoutActivitiesInput, StudentUncheckedUpdateWithoutActivitiesInput>
    create: XOR<StudentCreateWithoutActivitiesInput, StudentUncheckedCreateWithoutActivitiesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutActivitiesInput, StudentUncheckedUpdateWithoutActivitiesInput>
  }

  export type StudentUpdateWithoutActivitiesInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutActivitiesInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutTest_scoresInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTest_scoresInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTest_scoresInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTest_scoresInput, StudentUncheckedCreateWithoutTest_scoresInput>
  }

  export type StudentUpsertWithoutTest_scoresInput = {
    update: XOR<StudentUpdateWithoutTest_scoresInput, StudentUncheckedUpdateWithoutTest_scoresInput>
    create: XOR<StudentCreateWithoutTest_scoresInput, StudentUncheckedCreateWithoutTest_scoresInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutTest_scoresInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutTest_scoresInput, StudentUncheckedUpdateWithoutTest_scoresInput>
  }

  export type StudentUpdateWithoutTest_scoresInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTest_scoresInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutAchievementsInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAchievementsInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAchievementsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAchievementsInput, StudentUncheckedCreateWithoutAchievementsInput>
  }

  export type StudentUpsertWithoutAchievementsInput = {
    update: XOR<StudentUpdateWithoutAchievementsInput, StudentUncheckedUpdateWithoutAchievementsInput>
    create: XOR<StudentCreateWithoutAchievementsInput, StudentUncheckedCreateWithoutAchievementsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAchievementsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAchievementsInput, StudentUncheckedUpdateWithoutAchievementsInput>
  }

  export type StudentUpdateWithoutAchievementsInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAchievementsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutProject_experiencesInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutProject_experiencesInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    meeting_logs?: MeetingLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutProject_experiencesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutProject_experiencesInput, StudentUncheckedCreateWithoutProject_experiencesInput>
  }

  export type StudentUpsertWithoutProject_experiencesInput = {
    update: XOR<StudentUpdateWithoutProject_experiencesInput, StudentUncheckedUpdateWithoutProject_experiencesInput>
    create: XOR<StudentCreateWithoutProject_experiencesInput, StudentUncheckedCreateWithoutProject_experiencesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutProject_experiencesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutProject_experiencesInput, StudentUncheckedUpdateWithoutProject_experiencesInput>
  }

  export type StudentUpdateWithoutProject_experiencesInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutProject_experiencesInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutMeeting_logsInput = {
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
    user: UserCreateNestedOneWithoutStudentInput
    primary_coordinator?: UserCreateNestedOneWithoutCoordinated_studentsInput
    personal_profile?: PersonalProfileCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptCreateNestedManyWithoutStudentInput
    activities?: ActivityCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreCreateNestedManyWithoutStudentInput
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutMeeting_logsInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    primary_coordinator_id?: string | null
    profile_completion_pct?: number
    personal_profile?: PersonalProfileUncheckedCreateNestedOneWithoutStudentInput
    academic_profile?: AcademicProfileUncheckedCreateNestedOneWithoutStudentInput
    transcripts?: TranscriptUncheckedCreateNestedManyWithoutStudentInput
    activities?: ActivityUncheckedCreateNestedManyWithoutStudentInput
    test_scores?: TestScoreUncheckedCreateNestedManyWithoutStudentInput
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    project_experiences?: ProjectExperienceUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutMeeting_logsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutMeeting_logsInput, StudentUncheckedCreateWithoutMeeting_logsInput>
  }

  export type UserCreateWithoutMeeting_logsInput = {
    id?: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    organization: OrganizationCreateNestedOneWithoutUsersInput
    student?: StudentCreateNestedOneWithoutUserInput
    coordinated_students?: StudentCreateNestedManyWithoutPrimary_coordinatorInput
  }

  export type UserUncheckedCreateWithoutMeeting_logsInput = {
    id?: string
    organization_id: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    coordinated_students?: StudentUncheckedCreateNestedManyWithoutPrimary_coordinatorInput
  }

  export type UserCreateOrConnectWithoutMeeting_logsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMeeting_logsInput, UserUncheckedCreateWithoutMeeting_logsInput>
  }

  export type StudentUpsertWithoutMeeting_logsInput = {
    update: XOR<StudentUpdateWithoutMeeting_logsInput, StudentUncheckedUpdateWithoutMeeting_logsInput>
    create: XOR<StudentCreateWithoutMeeting_logsInput, StudentUncheckedCreateWithoutMeeting_logsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutMeeting_logsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutMeeting_logsInput, StudentUncheckedUpdateWithoutMeeting_logsInput>
  }

  export type StudentUpdateWithoutMeeting_logsInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    primary_coordinator?: UserUpdateOneWithoutCoordinated_studentsNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutMeeting_logsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    primary_coordinator_id?: NullableStringFieldUpdateOperationsInput | string | null
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserUpsertWithoutMeeting_logsInput = {
    update: XOR<UserUpdateWithoutMeeting_logsInput, UserUncheckedUpdateWithoutMeeting_logsInput>
    create: XOR<UserCreateWithoutMeeting_logsInput, UserUncheckedCreateWithoutMeeting_logsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMeeting_logsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMeeting_logsInput, UserUncheckedUpdateWithoutMeeting_logsInput>
  }

  export type UserUpdateWithoutMeeting_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
    coordinated_students?: StudentUpdateManyWithoutPrimary_coordinatorNestedInput
  }

  export type UserUncheckedUpdateWithoutMeeting_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    organization_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    coordinated_students?: StudentUncheckedUpdateManyWithoutPrimary_coordinatorNestedInput
  }

  export type UserCreateManyOrganizationInput = {
    id?: string
    email: string
    password_hash: string
    role: $Enums.UserRole
    first_name: string
    last_name: string
    created_at?: Date | string
  }

  export type UserUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneWithoutUserNestedInput
    coordinated_students?: StudentUpdateManyWithoutPrimary_coordinatorNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutCoordinatorNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    coordinated_students?: StudentUncheckedUpdateManyWithoutPrimary_coordinatorNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutCoordinatorNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyPrimary_coordinatorInput = {
    user_id: string
    graduation_year: number
    current_grade: $Enums.GradeLevel
    profile_completion_pct?: number
  }

  export type MeetingLogCreateManyCoordinatorInput = {
    id?: string
    student_id: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
  }

  export type StudentUpdateWithoutPrimary_coordinatorInput = {
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
    personal_profile?: PersonalProfileUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUpdateManyWithoutStudentNestedInput
    activities?: ActivityUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPrimary_coordinatorInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
    personal_profile?: PersonalProfileUncheckedUpdateOneWithoutStudentNestedInput
    academic_profile?: AcademicProfileUncheckedUpdateOneWithoutStudentNestedInput
    transcripts?: TranscriptUncheckedUpdateManyWithoutStudentNestedInput
    activities?: ActivityUncheckedUpdateManyWithoutStudentNestedInput
    test_scores?: TestScoreUncheckedUpdateManyWithoutStudentNestedInput
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    project_experiences?: ProjectExperienceUncheckedUpdateManyWithoutStudentNestedInput
    meeting_logs?: MeetingLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutPrimary_coordinatorInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    graduation_year?: IntFieldUpdateOperationsInput | number
    current_grade?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    profile_completion_pct?: IntFieldUpdateOperationsInput | number
  }

  export type MeetingLogUpdateWithoutCoordinatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutMeeting_logsNestedInput
  }

  export type MeetingLogUncheckedUpdateWithoutCoordinatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingLogUncheckedUpdateManyWithoutCoordinatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    student_id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptCreateManyStudentInput = {
    id?: string
    course_name: string
    grade_level: $Enums.GradeLevel
    semester: $Enums.Semester
    grade_value: string
    credits?: number | null
    honors_level?: $Enums.HonorsLevel
    is_board_exam?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityCreateManyStudentInput = {
    id?: string
    activity_name: string
    category: string
    role?: string | null
    grade_levels: JsonNullValueInput | InputJsonValue
    hours_per_week: number
    weeks_per_year: number
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TestScoreCreateManyStudentInput = {
    id?: string
    test_type: string
    test_name: string
    test_date: Date | string
    composite_score?: number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AchievementCreateManyStudentInput = {
    id?: string
    achievement_type: $Enums.AchievementType
    title: string
    organization?: string | null
    grade_level?: $Enums.GradeLevel | null
    date_achieved?: Date | string | null
    description?: string | null
    metrics?: string | null
    recognition_level?: $Enums.RecognitionLevel | null
    verifiable_link?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectExperienceCreateManyStudentInput = {
    id?: string
    experience_type: $Enums.ExperienceType
    title: string
    organization?: string | null
    location?: string | null
    start_date: Date | string
    end_date?: Date | string | null
    is_ongoing?: boolean
    role_title?: string | null
    description?: string | null
    outcomes?: string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: string | null
    mentor_name?: string | null
    mentor_email?: string | null
    status?: $Enums.ProjectStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type MeetingLogCreateManyStudentInput = {
    id?: string
    coordinator_id: string
    meeting_date: Date | string
    duration_minutes: number
    notes: string
    action_items?: string | null
    created_at?: Date | string
  }

  export type TranscriptUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    grade_level?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    semester?: EnumSemesterFieldUpdateOperationsInput | $Enums.Semester
    grade_value?: StringFieldUpdateOperationsInput | string
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    honors_level?: EnumHonorsLevelFieldUpdateOperationsInput | $Enums.HonorsLevel
    is_board_exam?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    grade_level?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    semester?: EnumSemesterFieldUpdateOperationsInput | $Enums.Semester
    grade_value?: StringFieldUpdateOperationsInput | string
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    honors_level?: EnumHonorsLevelFieldUpdateOperationsInput | $Enums.HonorsLevel
    is_board_exam?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TranscriptUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    course_name?: StringFieldUpdateOperationsInput | string
    grade_level?: EnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel
    semester?: EnumSemesterFieldUpdateOperationsInput | $Enums.Semester
    grade_value?: StringFieldUpdateOperationsInput | string
    credits?: NullableFloatFieldUpdateOperationsInput | number | null
    honors_level?: EnumHonorsLevelFieldUpdateOperationsInput | $Enums.HonorsLevel
    is_board_exam?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity_name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    grade_levels?: JsonNullValueInput | InputJsonValue
    hours_per_week?: IntFieldUpdateOperationsInput | number
    weeks_per_year?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity_name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    grade_levels?: JsonNullValueInput | InputJsonValue
    hours_per_week?: IntFieldUpdateOperationsInput | number
    weeks_per_year?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity_name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    grade_levels?: JsonNullValueInput | InputJsonValue
    hours_per_week?: IntFieldUpdateOperationsInput | number
    weeks_per_year?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    test_type?: StringFieldUpdateOperationsInput | string
    test_name?: StringFieldUpdateOperationsInput | string
    test_date?: DateTimeFieldUpdateOperationsInput | Date | string
    composite_score?: NullableIntFieldUpdateOperationsInput | number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    test_type?: StringFieldUpdateOperationsInput | string
    test_name?: StringFieldUpdateOperationsInput | string
    test_date?: DateTimeFieldUpdateOperationsInput | Date | string
    composite_score?: NullableIntFieldUpdateOperationsInput | number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestScoreUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    test_type?: StringFieldUpdateOperationsInput | string
    test_name?: StringFieldUpdateOperationsInput | string
    test_date?: DateTimeFieldUpdateOperationsInput | Date | string
    composite_score?: NullableIntFieldUpdateOperationsInput | number | null
    section_scores?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievement_type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    grade_level?: NullableEnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel | null
    date_achieved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    recognition_level?: NullableEnumRecognitionLevelFieldUpdateOperationsInput | $Enums.RecognitionLevel | null
    verifiable_link?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievement_type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    grade_level?: NullableEnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel | null
    date_achieved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    recognition_level?: NullableEnumRecognitionLevelFieldUpdateOperationsInput | $Enums.RecognitionLevel | null
    verifiable_link?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievement_type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    grade_level?: NullableEnumGradeLevelFieldUpdateOperationsInput | $Enums.GradeLevel | null
    date_achieved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metrics?: NullableStringFieldUpdateOperationsInput | string | null
    recognition_level?: NullableEnumRecognitionLevelFieldUpdateOperationsInput | $Enums.RecognitionLevel | null
    verifiable_link?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectExperienceUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    experience_type?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_ongoing?: BoolFieldUpdateOperationsInput | boolean
    role_title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    outcomes?: NullableStringFieldUpdateOperationsInput | string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_name?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectExperienceUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    experience_type?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_ongoing?: BoolFieldUpdateOperationsInput | boolean
    role_title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    outcomes?: NullableStringFieldUpdateOperationsInput | string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_name?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectExperienceUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    experience_type?: EnumExperienceTypeFieldUpdateOperationsInput | $Enums.ExperienceType
    title?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_ongoing?: BoolFieldUpdateOperationsInput | boolean
    role_title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    outcomes?: NullableStringFieldUpdateOperationsInput | string | null
    skills_learned?: NullableJsonNullValueInput | InputJsonValue
    project_link?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_name?: NullableStringFieldUpdateOperationsInput | string | null
    mentor_email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingLogUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    coordinator?: UserUpdateOneRequiredWithoutMeeting_logsNestedInput
  }

  export type MeetingLogUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    coordinator_id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MeetingLogUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    coordinator_id?: StringFieldUpdateOperationsInput | string
    meeting_date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration_minutes?: IntFieldUpdateOperationsInput | number
    notes?: StringFieldUpdateOperationsInput | string
    action_items?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}