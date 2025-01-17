import { setOutgoingHeaders } from '@pantheon-systems/wordpress-kit';
import { NextSeo } from 'next-seo';

import { Paginator } from '@pantheon-systems/nextjs-kit';
import { PageGrid } from '../../components/grid.jsx';
import Layout from '../../components/layout';
import PageHeader from '../../components/page-header';
import { getFooterMenu } from '../../lib/Menus';
import { getLatestPages } from '../../lib/Pages';

export default function PageListTemplate({ menuItems, pages }) {
	const RenderCurrentItems = ({ currentItems }) => {
		return <PageGrid contentType="pages" data={currentItems} />;
	};

	return (
		<Layout footerMenu={menuItems}>
			<NextSeo title="" description="" />
			<div>
				<section>
					<PageHeader title="Pages" />
					<Paginator
						data={pages}
						itemsPerPage={12}
						Component={RenderCurrentItems}
					/>
				</section>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ res }) {
	const { menuItems, menuItemHeaders } = await getFooterMenu();
	const { pages, headers: pageHeaders } = await getLatestPages(100);

	const headers = [menuItemHeaders, pageHeaders];
	setOutgoingHeaders({ headers, res });

	return {
		props: {
			menuItems,
			pages,
		},
	};
}
