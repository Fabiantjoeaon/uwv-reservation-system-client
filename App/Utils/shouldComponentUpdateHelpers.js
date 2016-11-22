/**
 * [shallowEqual description]
 * @param  {[type]} objA [description]
 * @param  {[type]} objB [description]
 * @return {[type]}      [description]
 */
function shallowEqual(objA: mixed, objB: mixed): boolean {
  // If state or props are the same don't do anything
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

/**
 * [shallowCompare description]
 * @param  {[type]} instance  [description]
 * @param  {[type]} nextProps [description]
 * @param  {[type]} nextState [description]
 * @return {[type]}           [description]
 */
export default function shallowCompare(instance, nextProps, nextState) {
  // Return only if shallowequal is false
  return (
    !shallowEqual(instance.props, nextProps) ||
    !shallowEqual(instance.state, nextState)
  );
}
