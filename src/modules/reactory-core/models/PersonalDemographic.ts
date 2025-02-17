import mongoose from 'mongoose';
import moment from 'moment';
import Reactory from '@reactory/reactory-core';

const { ObjectId } = mongoose.Schema.Types;

const PersonalDemographicSchema = new mongoose.Schema({
  id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  race: String,
  dob: Date,
  gender: String,
  pronoun: String,
  position: String,
  region: {
    type: ObjectId,
    ref: 'Region',
  },
  operationalGroup: {
    type: ObjectId,
    ref: 'Organization'
  },
  businessUnit: {
    type: ObjectId,
    ref: 'BusinessUnit'
  },
  team: {
    type: ObjectId,
    ref: 'Team'
  },
});

PersonalDemographicSchema.statics.GetLoggedInUserDemograpics = async function GetLoggedInUserDemograpics(context: Reactory.Server.IReactoryContext): Promise<any> {
  const { user, partner } = context;
  return await this.findOne({ userId: user._id });
};

PersonalDemographicSchema.methods.age = function age() {
  const { dob } = this;
  if (dob === null) return -1;
  const $dob = moment(dob);
  if (moment.isMoment($dob) === true) {
    return moment().diff($dob, 'years')
  }
  return -1;
}

export interface ISetPersonalDemographicsParams {
  userId?: string,
  race?: string
  dob?: Date
  gender?: string
  position?: string
  region?: string
  operationalGroup?: string
  businessUnit?: string
  team?: string
}; 


PersonalDemographicSchema.statics.SetLoggedInUserDemograpics = async function SetLoggedInUserDemograpics(args: any, context: Reactory.Server.IReactoryContext): Promise<any> {
  const { user, partner } = context;
  const { race, age, gender, position, region, operationalGroup, businessUnit, team } = args;
  const saveResponse = await this.findOneAndUpdate(
    { userId: user._id },
    { userId: user._id, race, age, gender, position, region, operationalGroup, businessUnit, team },
    { new: true, upsert: true }
  );

  return saveResponse
}

const PersonalDemographicModel = mongoose.model('PersonalDemographic', PersonalDemographicSchema, 'reactory_personal_demographics');

export default PersonalDemographicModel;
