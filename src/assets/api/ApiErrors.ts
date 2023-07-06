export type Error = {
  title: string,
  message: string
}

export const ErrorMessage: Record<string, Error> = {
  // AUTH ERRORS
  ["GRA0000"]: {title:'Error !',message:'Failed to validate request'},
  ["GRA0001"]: {title:'Error !',message:'Unauthorized'},
  ["GRA0003"]: {title:'Error !',message:'User already exists'},
  ["GRA0004"]: {title:'Error !',message:'Invalid validation ID'},
  ["GRA0005"]: {title:'Error !',message:'Invalid refresh token'},
  ["GRA0008"]: {title:'Error !',message:'User not found'},
  ["GRA0011"]: {title:'Error !',message:'Both mobile and email are missing'},
  ["GRA0012"]: {title:'Error !',message:'Invalid user details'},
  ["GRA0013"]: {title:'Error !',message:'Mobile number and email both cannot be empty'},
  ["GRA0014"]: {title:'Error !',message:'Invalid OTP'},
  ["GRA0015"]: {title:'Error !',message:'Auth token is expired'},
  ["GRA0016"]: {title:'Error !',message:'OAuth invalid provider'},
  ["GRA0017"]: { title: 'Error !', message: 'OAuth failed' },
  
  // OTHER ERRORS
  ["GR0000"]: {title:'Error !',message:'Error Message for Validation Error'},
  ["GR0001"]: {title:'Error !', message:'Something went wrong. Please try again later.'},
  ["GR0008"]: {title:'Error !',message:'User not found. Please create an account first.'},
  ["GR0009"]: {title:'Error !',message:'Profile not found'},
  ["GR0020"]: {title:'Error !',message:'Profile already exists'},
  ["GR0021"]: {title:'Error !',message:'WorkExperience not found'},
  ["GR0022"]: {title:'Error !',message:'Skills not found'},
  ["GR0026"]: {title:'Error !',message:'User details not found'},
  ["GR0036"]: {title:'Invalid date range', message:'End date must be after start date.'},
  ["GR0012"]: {title:'Email already in waitlist', message:'Please check your email for more information.'},
  ["GR0013"]: {title:'Error !',message:'Failed to create user'},
  ["GR0014"]: {title:'Error !',message:'Failed to create profile'},
  ["GR0015"]: {title:'Error !',message:'Aadhar not found'},
  ["GR0016"]: {title:'Error !',message:'Invalid user id'},
  ["GR0017"]: {title:'Error !',message:'Education not found'},
  ["GR0023"]: {title:'Error !',message:'Residential info not found'},
  ["GR0024"]: {title:'Error !',message:'Documents not found'},
  ["GR0025"]: {title:'Error !',message:'Document not found'},
  ["GR0027"]: {title:'Error !',message:'Document is already public'},
  ["GR0028"]: {title:'Error !',message:'Document is already shared'},
  ["GR0029"]: {title:'Error !',message:'Document is not shared'},
  ["GR0035"]: {title:'Error !',message:'Document has expired'},
  ["GR0037"]: {title:'Error !',message:'Document already uploaded'},
  ["GR0042"]: {title:'Error !',message:'Coordinates are invalid'},
  ["GR0030"]: {title:'Error !',message:'Number is not linked with Aadhar'},
  ["GR0044"]: {title:'Error !',message:'Internal Server Error'},
  ["GR0031"]: {title:'Error !',message:'Error Message for PAN Verification Failure'},
  ["GR0032"]: {title:'Error !',message:'Error Message for Driving License Verification Failure'},
  ["GR0033"]: {title:'Invalid ID Number!', message:'Please enter valid Aadhar number'},
  ["GR0034"]: {title:'Limit exceeded!', message:'Rate limit exceeded for OTP requests'},
  ["GR0043"]: {title:'Error !',message:'User location not found'},
  ["GR0038"]: {title:'Error !',message:'Aadhar verification is required'},
  ["GR0039"]: {title:'Error !',message:'Aadhar already exists'},
  ["GR0040"]: {title:'Error !',message:'PAN already exists'},
  ["GR0041"]: {title:'Error !',message:'Driving License already exists'},

  // CUSTOM ERRORS
  ["NO_SKILL"]: {title: "Error !", message: "Please add atleast one skill."},
  ["MISSING_TAGS"]: {title: "Error !", message: "Please select document tags for all the documents."}
};