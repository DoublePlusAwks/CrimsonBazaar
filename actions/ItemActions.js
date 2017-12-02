import db from 'config/db';
import { uploadImage } from 'util/imageUploadHelper';

const itemsRef = db.collection('items');
const auctionsRef = db.collection('auctions');
const usersRef = db.collection('users');

export const addItem = ({ owner, auction, image, description, title }, successCallback) => {
  return dispatch => {
    let newItem = itemsRef.doc();
    console.log(newItem);
    uploadImage(image, newItem.id, successCallback);
    newItem.set({
      owner,
      auction,
      description,
      title,
    });
    auctionsRef.doc(auction).update({
      [`items.${newItem.id}`]: true
    });
    dispatch({ type: 'ADD_ITEM' });
  };
};
