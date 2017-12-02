import db from 'config/db';
import { S3_URL_BASE } from 'config/aws';
import { uploadImage } from 'util/imageUploadHelper';

const itemsRef = db.collection('items');
const auctionsRef = db.collection('auctions');
const usersRef = db.collection('users');

export const addItem = ({ owner, auction, image, description, title }, successCallback) => {
  return dispatch => {
    let newItem = itemsRef.doc();
    uploadImage(image, newItem.id, successCallback);
    newItem.set({
      owner,
      auction,
      description,
      title,
      image: `${S3_URL_BASE}/items/${newItem.id}.jpg`,
    });
    auctionsRef.doc(auction).update({
      [`items.${newItem.id}`]: true,
      [`participants.${owner}`]: true
    });
    dispatch({ type: 'ADD_ITEM' });
  };
};
