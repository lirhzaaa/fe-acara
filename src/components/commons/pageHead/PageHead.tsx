import Head from "next/head";

interface TProps {
    title?: string
}

const PageHead = (props: TProps) => {
    const { title = 'Acara' } = props;
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    )
}

export default PageHead