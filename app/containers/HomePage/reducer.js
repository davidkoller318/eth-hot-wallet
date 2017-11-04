/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  GENERATE_WALLET,
  GENERATE_WALLET_SUCCESS,
  GENERATE_WALLET_ERROR,
  GENERATE_WALLET_CANCEL,

  GENERATE_KEYSTORE,
  GENERATE_KEYSTORE_SUCCESS,
  GENERATE_KEYSTORE_ERROR,
  SHOW_RESTORE_WALLET,
  RESTORE_WALLET_CANCEL,
  CHANGE_USER_SEED,
  CHANGE_USER_PASSWORD,
  RESTORE_WALLET_FROM_SEED,
  RESTORE_WALLET_FROM_SEED_ERROR,
  RESTORE_WALLET_FROM_SEED_SUCCESS,

  CHANGE_BALANCE,

  SHOW_SEND_TOKEN,
  HIDE_SEND_TOKEN,

  GENERATE_ADDRESS,
  GENERATE_ADDRESS_SUCCESS,
  GENERATE_ADDRESS_ERROR,

  LOCK_WALLET,
  UNLOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,
  UNLOCK_WALLET_ERROR,

  SET_EXCHANGE_RATES,
  SELECT_CURRENCY,

  CLOSE_WALLET,
} from './constants';

/*
.set('keystore', false)
.set('addressList', false)
.set('isConfirmed', false)
.set('addressList', false)
*/
// The initial state of the App
const initialState = fromJS({
  isShowGenerateWallet: false,
  generateWalletLoading: false,  // generate new seed and password
  generateWalletError: false,
  password: false,
  seed: false,

  generateKeystoreLoading: false,
  generateKeystoreError: false,  // if error - no addressList displayed

  isShowRestoreWallet: false,
  userSeed: '',
  userPassword: '',
  restoreWalletError: false,

  isComfirmed: false, // if true then we have a valid keystore

  keystore: false,
  addressList: false,
  /*
  addressList: {
    address1: {
        order: 1
        eth: {
            balance: bigNumber
            convertBalance: bigNumber
          }
      }
  } */

  exchangeRates: {},
  convertTo: false,

  addressListLoading: false, // for loading and error inside addressList
  addressListError: false,
  addressListMsg: false,

  sendToken: true,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {

    case GENERATE_WALLET:
      return state
        .set('isShowGenerateWallet', true)
        .set('generateWalletLoading', true)
        .set('generateWalletError', false);
    case GENERATE_WALLET_SUCCESS:
      return state
        .set('generateWalletLoading', false)
        .set('seed', action.seed)
        .set('password', action.password);
    case GENERATE_WALLET_ERROR:
      return state
        .set('generateWalletLoading', false)
        .set('generateWalletError', action.error);
    case GENERATE_WALLET_CANCEL:
      return state
        .set('isShowGenerateWallet', false)
        .set('generateWalletLoading', true)
        .set('generateWalletError', false)
        .set('password', false)
        .set('seed', false);

    case GENERATE_KEYSTORE:
      return state
        .set('isShowGenerateWallet', false)
        .set('generateKeystoreLoading', true)
        .set('generateKeystoreError', false);
    case GENERATE_KEYSTORE_SUCCESS:
      return state
        .set('keystore', action.keystore)
        .set('seed', false)
        .set('isComfirmed', true)
        .set('addressListError', false)
        .set('addressList', fromJS(action.addressList))
        .set('generateKeystoreLoading', false);
    case GENERATE_KEYSTORE_ERROR:
      return state
        .set('generateKeystoreLoading', false)
        .set('generateKeystoreError', action.error)
        .set('isComfirmed', false);

    case SHOW_RESTORE_WALLET:
      return state
        .set('isShowRestoreWallet', true)
        .set('seed', false)
        .set('userSeed', '');
    case RESTORE_WALLET_CANCEL:
      return state
        .set('isShowRestoreWallet', false)
        .set('userPassword', '')
        .set('userSeed', '')
        .set('restoreWalletError', false);
    case CHANGE_USER_SEED:
      return state
        .set('userSeed', action.userSeed); // Delete prefixed space from user seed
    case CHANGE_USER_PASSWORD:
      return state
        .set('userPassword', action.password);
    case RESTORE_WALLET_FROM_SEED:
      return state
        .set('restoreWalletError', false)
        .set('isComfirmed', false);
    case RESTORE_WALLET_FROM_SEED_ERROR:
      return state
        .set('restoreWalletError', action.error);
    case RESTORE_WALLET_FROM_SEED_SUCCESS:
      return state
        .set('isShowRestoreWallet', false)
        .set('seed', action.userSeed)
        .set('password', action.userPassword)
        .set('userSeed', '')
        .set('userPassword', '');


    case CHANGE_BALANCE:
      return state
        .setIn(['addressList', action.address, 'eth', 'balance'], action.balance);

    case SHOW_SEND_TOKEN:
      return state
        .set('sendToken', true);
    case HIDE_SEND_TOKEN:
      return state
        .set('sendToken', false);

    case GENERATE_ADDRESS:
      return state
        .set('addressListLoading', true)
        .set('addressListError', false)
        .set('addressListMsg', false);
    case GENERATE_ADDRESS_SUCCESS:
      return state
        .set('addressListLoading', false)
        .set('addressListError', false)
        .set('addressListMsg', 'New address generated succesfully')
        // Add new address as key and set balance as false ('n/a')
        .setIn(['addressList', action.newAddress, 'eth', 'balance'], false)
        .setIn(['addressList', action.newAddress, 'index'], action.index);
    case GENERATE_ADDRESS_ERROR:
      return state
        .set('addressListLoading', false)
        .set('addressListError', action.error);


    case LOCK_WALLET:
      return state
        .set('password', false)
        .set('addressListError', false)
        .set('addressListMsg', 'Wallet Locked');
    case UNLOCK_WALLET:
      return state;
    case UNLOCK_WALLET_SUCCESS:
      return state
        .set('password', action.password)
        .set('addressListError', 'Wallet Unlocked Succesfully');
    case UNLOCK_WALLET_ERROR:
      return state
        .set('addressListError', action.error);

    case SET_EXCHANGE_RATES:
      return state
        .set('exchangeRates', fromJS(action.rates));
    case SELECT_CURRENCY:
      return state
        .set('convertTo', fromJS(action.convertTo));

    case CLOSE_WALLET:
      return initialState;

    default:
      return state;
  }
}
/*
  LOCK_WALLET,
  UNLOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,
  UNLOCK_WALLET_ERROR,
*/

export default homeReducer;
