import database from '../database'

export function getNewKey(child) {
  return database.ref().child(child).push().key;
}

export function getKey(child) {
  return database.ref().child(child).key
}