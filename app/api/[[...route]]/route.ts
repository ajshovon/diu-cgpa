import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { secureHeaders } from "hono/secure-headers";
import { handle } from "hono/vercel";
import { z } from "zod";

const callApi = async (id: string, semester: string, backbone: string, sid: string, headers: any) => {
  const url = `${backbone}${semester}${sid}${id}`;

  return fetch(url, {
    headers,
    method: "GET",
  });
};

export const runtime = "edge";
const app = new Hono().basePath("/api");

app.use(secureHeaders());
app.use("/*", cors());
app.use(csrf({ origin: "shovon.me" }));

app.get(
  "/result/full",
  zValidator(
    "query",
    z.object({
      id: z.string().min(1),
    }),
  ),
  async (c) => {
    const { BACKBONE_RESULT } = env<{ BACKBONE_RESULT: string }>(c);
    const { BACKBONE_INFO } = env<{ BACKBONE_INFO: string }>(c);
    const { ID } = env<{ ID: string }>(c);
    const { H } = env<{ H: string }>(c);
    const headers = JSON.parse(H);
    const id = c.req.query("id");
    const responseInfo = await fetch(`${BACKBONE_INFO}${id}`, {
      headers,
      method: "GET",
    });
    const dataInfo = await responseInfo.json();
    let startSemester = parseInt(dataInfo["semesterId"]) as number;
    const studentInfoObj = {
      name: dataInfo["studentName"],
      id: dataInfo["semesterId"],
      program: dataInfo["progShortName"],
      batch: dataInfo["batchNo"],
      department: dataInfo["deptShortName"],
      faculty: dataInfo["facShortName"],
      campus: dataInfo["campusName"],
      shift: dataInfo["shift"],
    };

    const semesterResults: any[] = [];
    let totalChecks = 0;

    const promises = [];

    while (startSemester) {
      if ([1, 2, 3].includes(parseInt(startSemester.toString().slice(-1)))) {
        if (totalChecks > 20) break;

        // Push each API call into the promises array
        promises.push(
          callApi(id || "", startSemester.toString(), BACKBONE_RESULT, ID, headers)
            .then((response) => response.json())
            .then((json_data) => {
              if (json_data) {
                // do not push if json_data is empty
                if (Object.keys(json_data).length > 0) {
                  semesterResults.push(json_data);
                }
              }
            })
            .catch(() => {
              // Handle individual call failure
            }),
        );

        totalChecks += 1;
      }
      startSemester += 1;
    }
    // Wait for all API calls to finish
    await Promise.all(promises);

    return c.json({ studentInfoObj, semesterResults });
  },
);

export const GET = handle(app);

export default app as never;
