"use client";
import { createOpenAPIPage } from "fumadocs-openapi/ui";
import {
	DefaultResultDisplay,
	type ResultDisplayProps,
} from "fumadocs-openapi/playground/client";

function PrettyJSONResultDisplay(props: ResultDisplayProps) {
	const { data } = props;

	if (data.type !== "response") {
		return <DefaultResultDisplay {...props} />;
	}

	const contentType = data.headers.get("Content-Type")?.toLowerCase() ?? "";
	const isJSONResponse =
		contentType.includes("application/json") || contentType.includes("+json");

	if (!isJSONResponse || data.body.byteLength === 0) {
		return <DefaultResultDisplay {...props} />;
	}

	try {
		const raw = new TextDecoder("utf-8").decode(data.body);
		const pretty = JSON.stringify(JSON.parse(raw), null, 2);
		const encoded = new TextEncoder().encode(pretty);
		const prettyBody = encoded.buffer.slice(
			encoded.byteOffset,
			encoded.byteOffset + encoded.byteLength,
		);

		return (
			<DefaultResultDisplay
				{...props}
				data={{
					...data,
					body: prettyBody,
				}}
			/>
		);
	} catch {
		return <DefaultResultDisplay {...props} />;
	}
}

export const OpenAPIPage = createOpenAPIPage({
	playground: {
		components: {
			ResultDisplay: PrettyJSONResultDisplay,
		},
	},
});
