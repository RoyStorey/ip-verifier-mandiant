import axios from "axios";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333,
});

export default function getArtifactFromMandiant(artifact) {
  const bearerToken = process.env.BEARER_TOKEN;
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  return limiter.schedule(() =>
    axios
      .get(
        `https://api.intelligence.mandiant.com/v4/indicator/ipv4/${artifact}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        console.error(error);
      })
  );
}
// console.log(await getArtifactFromMandiant("8.8.8.11"));
// console.log(await getArtifact({ query: { artifact: "91.109.184.3" } }));
