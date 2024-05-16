class Scorecard {

  constructor() {
    this.scores = [];
    this.frames = [];
  }

  addFrame(rollOne, rollTwo) {
    if (this.frames.length < 10) {
      
      this.calculateScoreRegular(rollOne, rollTwo);
      this.frames.push([rollOne, rollTwo]);

      if (rollOne + rollTwo === 10) {
        return `Amazing! Your score is ${this.getTotal()} and your bonus will be added in the next round!`;
      } else {
        return `Good job, but you can do even better! Your score is ${this.getTotal()}!`;
      }

    } else if (this.frames.length === 10) {
      
      this.calculateScoreLastFrame(rollOne, rollTwo);
      this.frames.push([rollOne, rollTwo]);
      
      return `Congratulations!! Game is completed!! Your total score is ${this.getTotal()}!`;

    } else if (this.frames.length > 10) {
      
      return `Please run <scorecard>.reset() to start a new game!`;
    }
  }

  //checking if last frame is a Strike
  had_Strike() {
    let prevFrame = this.frames.length - 1;
    return (
      this.frames[prevFrame][0] === 10 || this.frames[prevFrame][1] === 10
    );
  }

  //checking if last frame is a Spare
  had_Spare() {
    let prevFrame = this.frames.length - 1;
    return this.frames[prevFrame][0] + this.frames[prevFrame][1] === 10;
  }

  //calculating score for frames 1-9
  calculateScoreRegular(rollOne, rollTwo) {
    let prevScore = this.scores.length - 1;

    if (this.scores.length === 0 || this.scores[prevScore] < 10) {
      //if list is empty or last frame is a regular
      this.scores.push(rollOne + rollTwo);
    } else if (this.had_Strike()) {
      //if last frame is a strike
      this.scores.pop(); //deletes last frame's score  (10)
      this.scores.push(rollOne + rollTwo + 10); // ammend score WITH the bonus and add it back 
      this.scores.push(rollOne + rollTwo); //add the new frame
    } else if (this.had_Spare()) {
      //if last frame is a spare
      this.scores.pop(); //deletes last frame's score (10)
      this.scores.push(rollOne + 10); // ammend score WITH the bonus and add it back 
      this.scores.push(rollOne + rollTwo); //add the new frame
    }
  }

  //calculating score for frame 10
  calculateScoreLastFrame(rollOne, rollTwo) {
    if (this.scores[9] < 10) {
      console.log(this.frames);
      this.scores.push(rollOne + rollTwo);
    } else if (this.frames[9][0] === 10) {
      //if 10nth frame has a strike
      this.scores.pop(); //deletes last frame's score  (10)
      this.scores.push(rollOne + rollTwo + 10); // ammend score WITH the bonus and add it back 
    } else if (this.frames[9][1] === 10) {
      this.scores.pop(); //deletes last frame's score (10)
      this.scores.push(rollOne + 10); // ammend score WITH the bonus and add it back 
    } else if (this.had_Spare()) {
      //if last frame is a spare
      this.scores.pop(); //deletes last frame's score (10)
      this.scores.push(rollOne + 10); // ammend score WITH the bonus and add it back 
    }
  }

  getTotal() {
    if (this.scores.length === 0) {
      return 0;
    } else {
      let total_score = this.scores.reduce((acc, curr) => acc + curr);
      return total_score;
    }
  }

  reset() {
    this.scores = [];
    this.frames = [];
  }
}

const score=new Scorecard()
console.log(score.addFrame(1,4)) //1st frame
console.log(score.addFrame(4,5)) //2nd frame
console.log(score.addFrame(6,4)) //3rd frame
console.log(score.addFrame(5,5)) //4th frame
console.log(score.addFrame(10,0)) //5th frame
console.log(score.addFrame(0,1)) //6th frame
console.log(score.addFrame(7, 3)) //7th frame
console.log(score.addFrame(6,4)) //8th frame
console.log(score.addFrame(10,0)) //9th frame
console.log(score.addFrame(2,8)) //10thst frame
console.log(score.addFrame(6,0)) //bonus frame
console.log(score.addFrame(6,0)) // needs reset before starting a new game 

module.exports = Scorecard;
