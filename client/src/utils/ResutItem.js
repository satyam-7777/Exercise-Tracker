export function getResultItems(result, filters = {}) {
  if (result.log) {
    const params = new URLSearchParams();

    if (filters.from) params.append("from", filters.from);
    if (filters.to) params.append("to", filters.to);
    if (filters.limit) params.append("limit", filters.limit);

    const queryString = params.toString();

    return [
      {
        id: "username",
        label: "Username",
        value: result.username,
      },

      {
        id: "user-id",
        label: "User ID",
        value: result._id,
      },

      {
        id: "count",
        label: "Exercise Count",
        value: result.count,
      },

      ...result.log.map((exercise, index) => ({
        id: `exercise-${index}`,
        label: `Exercise ${index + 1}`,
        value: `${exercise.description} - ${exercise.duration} minutes - ${exercise.date}`,
      })),

      {
        id: "exercise-log",
        label: "Exercise Log",
        value: "View Exercise Log JSON",
        href: `/api/users/${result._id}/logs${queryString ? `?${queryString}` : ""}`,
      },
    ];
  }

  if (result.description) {
    return [
      {
        id: "username",
        label: "Username",
        value: result.username,
      },

      {
        id: "user-id",
        label: "User ID",
        value: result._id,
      },

      {
        id: "description",
        label: "Description",
        value: result.description,
      },

      {
        id: "duration",
        label: "Duration",
        value: `${result.duration} minutes`,
      },

      {
        id: "date",
        label: "Date",
        value: result.date,
      },
    ];
  }

  return [
    {
      id: "username",
      label: "Username",
      value: result.username,
    },

    {
      id: "user-id",
      label: "User ID",
      value: result._id,
    },

    {
      id: "json",
      label: "JSON",
      value: "View User JSON",
      href: `/api/users/${result._id}`,
    },
  ];
}
