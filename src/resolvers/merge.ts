const User = require('../../models/users');
const { dateToString } = require('../../helpers/date');

// const transformBooking = (booking) => ({
//   ...booking._doc,
//   user: () => user(booking._doc.userId),
//   event: () => event(booking._doc.eventId),
//   createdAt: dateToString(booking._doc.createdAt),
//   updatedAt: dateToString(booking._doc.updatedAt)
// });

// const transformUser = (user) => ({
//   ...user._doc,
//   createdEvents: () => events(user._doc.createdEvents),
//   lastSeen: dateToString(user._doc.lastSeen)
// });

// const transformEvent = (event) => ({
//   ...event._doc,
//   creator: () => user(event._doc.creator),
//   date: dateToString(event._doc.date)
// });

// const events = async (eventIds) => {
//   try {
//     const currentEvents = await Event.find({ _id: { $in: eventIds } });
//     return currentEvents.map(transformEvent);
//   } catch (err) {
//     console.error('evnnts: something went wrong', err);
//     throw err;
//   }
// };

// const user = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     return transformUser(user);
//   } catch (err) {
//     console.error('user: something went wrong', err);
//     throw err;
//   }
// };

// const event = async (eventId) => {
//   try {
//     const currentEvent = await Event.findById(eventId);
//     return transformEvent(currentEvent);
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
