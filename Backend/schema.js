import mongoose from "mongoose";
const addEntry = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    listOfParticipants: {
      type: String,
      required: true,
    },
    stime: {
      type: Number,
      required: true,
    },
    etime: {
      type: Number,
      required: true,
    },
    duration:{
      type: String,
    },
    notes: {
      type: String,
    },
    date: {
      type: String,
    },
  },

  { timestamps: true }
);

const add = mongoose.model("addEntry", addEntry);

export default add;
