// Weird array object bug hack..??
export default function resolveArrayLikeObject(arrayLikeObject) {
  let array;
  if(typeof arrayLikeObject === 'object') {
    array = Array.from(arrayLikeObject);
  } else {
    array = arrayLikeObject;
  }

  return array;
}
