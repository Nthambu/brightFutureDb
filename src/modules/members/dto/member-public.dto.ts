import { Exclude, Expose } from 'class-transformer';

// Explicit allow-list of fields safe to expose publicly.
// Keeps the leadership page from accidentally leaking internal fields
// if more sensitive columns (phone, email, idNumber) are added later.
@Exclude()
export class MemberPublicDto {
  @Expose() id: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() position: string;
  @Expose() bio: string;
  @Expose() photoUrl: string;
  @Expose() termStartDate: string;
  @Expose() displayOrder: number;
}
