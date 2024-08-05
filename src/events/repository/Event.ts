/**
 * Represents an event.
 *
 * @remarks
 * This interface defines the structure of an event object.
 */
export interface IEvent {
  startDate: Date;
  endDate: Date;
  title: string;
  details: string;
  imageURL: string;
  id: string;
}
