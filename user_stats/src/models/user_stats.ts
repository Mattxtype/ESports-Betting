import mongoose from "mongoose";

interface UserStatsAttrs {
  userEmail: string;
  tournaments: [
    {
      tourney_id: number;
      paid: boolean;
    }
  ];
}

interface UserStatstModel extends mongoose.Model<UserStatsDoc> {
  build(attrs: UserStatsAttrs): UserStatsDoc;
}

interface UserStatsDoc extends mongoose.Document {
  userEmail: string;
  tournaments: [
    {
      tourney_id: number;
      paid: boolean;
    }
  ];
}

const userStatsSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    require: true,
  },
  tournaments: {
    type: [
      {
        tourney_id: Number,
        paid: Boolean,
      },
    ],
    require: false,
  },
});

userStatsSchema.statics.build = (attrs: UserStatsAttrs) => {
  return new UserStats(attrs);
};

const UserStats = mongoose.model<UserStatsDoc, UserStatstModel>(
  "UserStats",
  userStatsSchema
);

export { UserStats };
