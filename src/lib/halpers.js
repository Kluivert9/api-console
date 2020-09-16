import {nanoid} from 'nanoid'

export function createHistoryItem(request, errorStatus) {
  const req = JSON.parse(request)
  const size = 10

  return {
    id: nanoid(size),
    action: req.action || "no_action",
    body: req,
    errorStatus
  }
}

export function deepEqual(obj1, obj2) {

  if (obj1 === obj2) {
    return true
  }

  if (obj1 == null || typeof(obj1) != "object" ||
    obj2 == null || typeof(obj2) != "object")
  {
    return false
  }

  let propertiesInA = 0
  let propertiesInB = 0

  for (let property in obj1) {
    if (property === 'id') {
      continue
    }

    propertiesInA += 1
  }

  for (let property in obj2) {
    if (property === 'id') {
      continue
    }

    propertiesInB += 1;

    if (!(property in obj1) || !deepEqual(obj1[property], obj2[property])) {
      return false
    }
  }
  return propertiesInA == propertiesInB
}

export function horizontalScroll(event) {
  let modifier

  if (event.deltaMode === event.DOM_DELTA_PIXEL) {
    modifier = 1;
  } else if (event.deltaMode === event.DOM_DELTA_LINE) {
    modifier = parseInt(getComputedStyle(this).lineHeight);
  } else if (event.deltaMode === event.DOM_DELTA_PAGE) {
    modifier = this.clientHeight;
  }

  if (event.deltaY !== 0) {
    this.scrollLeft += modifier * event.deltaY;
    event.preventDefault();
  }
}
