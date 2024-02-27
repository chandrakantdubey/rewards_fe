import * as _ from "lodash";
import * as crypto from "crypto-js";

const getDescryptedVal = (val, secretKey) => {
  const decryptObj = crypto.AES.decrypt(val, secretKey);
  return _.attempt(_.invoke, decryptObj, "toString", crypto.enc.Utf8);
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const getItem = (key) => {
  const retrievedVal = localStorage.getItem(key);

  if (_.isNull(retrievedVal)) {
    return null;
  }
  const decryptedVal = getDescryptedVal(retrievedVal, key);

  // value modified by user
  if (_.isError(decryptedVal) || _.isEmpty(decryptedVal)) {
    this.removeItem(key);
    return null;
  }

  const decryptedObj = _.attempt(JSON.parse.bind(null, decryptedVal));
  return _.isError(decryptedObj) ? decryptedVal : decryptedObj;
};

export const setItem = (key, val) => {
  let parsedVal;
  // Check whether value is an object
  if (_.isObject(val) || _.isArray(val)) {
    parsedVal = _.attempt(JSON.stringify.bind(null, val));
  }
  // If value is string
  else if (_.isString(val)) {
    parsedVal = val;
  }

  // Encrypt key and store in localStorage
  if (!_.isError(parsedVal) && !_.isUndefined(parsedVal)) {
    parsedVal = crypto.AES.encrypt(parsedVal, key);
    localStorage.setItem(key, parsedVal);
  }
};
