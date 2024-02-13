const { User } = require('../../models/index');
const { signToken } = require('../../utils/auth');

const resolvers = {
  Query: {
    // Resolver for the "me" query to get the logged-in user
    me: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Not logged in');
      }
      const user = await User.findById(context.user._id);
      return user;
    },
  },

  Mutation: {
    // Resolver for adding a user
    addUser: async (_, args) => {
      const user = await User.create(args);
      if (!user) {
        throw new Error('Something went wrong with creating the user');
      }
      const token = signToken(user);
      return { token, user };
    },

    // Resolver for logging in a user
    login: async (_, { loginInput, password }) => {
      // Determine if loginInput is an email or username based on the presence of an '@'
      const isEmail = loginInput.includes('@');
      
      // Construct the query condition based on the input type
      const condition = isEmail ? { email: loginInput } : { username: loginInput };
      
      // Find the user by email or username
      const user = await User.findOne(condition);
      if (!user) {
        throw new Error("Can't find this user");
      }
    
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Wrong password');
      }
    
      const token = signToken(user);
      return { token, user };
    },

    // Resolver for saving a book to a user's savedBooks
    saveBook: async (_, { input }, context) => {
      if (!context.user) {
        throw new Error('Not logged in');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error('Could not find user');
      }

      return updatedUser;
    },

    // Resolver for removing a book from savedBooks
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new Error('Not logged in');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this id");
      }

      return updatedUser;
    },
  },
};

module.exports = resolvers;
