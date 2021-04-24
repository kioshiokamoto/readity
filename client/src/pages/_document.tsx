import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					{/* <title>Readity</title> */}
					<link rel="icon" type="image/svg+xml" href="/reddit.svg" />
					<meta property="og:site_name" content="readity" />
					{/* <meta property="twitter:site" content="@readity"/> */}
					<meta property="twitter:card" content="summary" />
					<meta property="og:type" content="website" />

					<meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/reddit.svg`} />
					<meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/reddit.svg`} />
					
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;400;500;600;700&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
						integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
						crossOrigin="anonymous"
					/>
				</Head>
				<body className="font-body" style={{ backgroundColor: '#DAE0E6' }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
