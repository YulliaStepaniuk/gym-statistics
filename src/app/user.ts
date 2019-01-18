
export class User {
  _id: Object;
  userName: string;
  userTraining: string[];
}

class Training {
  trainingName: string;
  userExecises: Exercise[];
}

class Exercise {
  exerciseName: string;
}
