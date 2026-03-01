const ARRAY_INDEX_PATTERN = /\[(\d+)\]/g;

export const toPathSegments = (path: string) =>
  path
    .replace(ARRAY_INDEX_PATTERN, ".$1")
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);

const isIndexSegment = (segment: string) => /^\d+$/.test(segment);

export const setByPath = (target: unknown, path: string, value: unknown) => {
  const segments = toPathSegments(path);
  if (segments.length === 0 || typeof target !== "object" || target === null) {
    return;
  }

  let current: Record<string, unknown> | unknown[] = target as Record<string, unknown>;

  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    const nextSegment = segments[i + 1];
    const nextShouldBeArray = isIndexSegment(nextSegment);

    if (Array.isArray(current)) {
      const index = Number(segment);
      const currentValue = current[index];
      if (
        currentValue === undefined ||
        currentValue === null ||
        typeof currentValue !== "object"
      ) {
        current[index] = nextShouldBeArray ? [] : {};
      }
      current = current[index] as Record<string, unknown> | unknown[];
      continue;
    }

    const currentValue = current[segment];
    if (
      currentValue === undefined ||
      currentValue === null ||
      typeof currentValue !== "object"
    ) {
      current[segment] = nextShouldBeArray ? [] : {};
    }
    current = current[segment] as Record<string, unknown> | unknown[];
  }

  const lastSegment = segments[segments.length - 1];
  if (Array.isArray(current)) {
    current[Number(lastSegment)] = value;
  } else {
    current[lastSegment] = value;
  }
};

export const getByPath = <T = unknown>(target: unknown, path: string): T | undefined => {
  const segments = toPathSegments(path);
  let current: unknown = target;

  for (const segment of segments) {
    if (Array.isArray(current)) {
      current = current[Number(segment)];
      continue;
    }
    if (typeof current === "object" && current !== null) {
      current = (current as Record<string, unknown>)[segment];
      continue;
    }
    return undefined;
  }

  return current as T | undefined;
};

export const appendToArrayByPath = (target: unknown, path: string, value: unknown) => {
  const existing = getByPath<unknown[]>(target, path);
  if (Array.isArray(existing)) {
    existing.push(value);
    return;
  }
  setByPath(target, path, [value]);
};

export const removeArrayItemByPath = (target: unknown, path: string, index: number) => {
  const existing = getByPath<unknown[]>(target, path);
  if (!Array.isArray(existing)) {
    return;
  }
  if (index < 0 || index >= existing.length) {
    return;
  }
  existing.splice(index, 1);
};
