const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.getOnline = async function(user) {
  if (typeof user === "string") {
    var data = await (
      await fetch(`https://data.scratchtools.app/isonline/${user}/`)
    ).json();
    if (data.error) {
      throw new Error(data.error);
    } else {
      data.cached = data.scratchtools;
      data.scratchtools = undefined;
      return data;
    }
  } else {
    throw new Error("User must be a string, not " + typeof user + ".");
  }
}
