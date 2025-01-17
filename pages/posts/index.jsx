import { setOutgoingHeaders } from '@pantheon-systems/wordpress-kit';
import { NextSeo } from 'next-seo';

import { Paginator } from '@pantheon-systems/nextjs-kit';
import { PostGrid } from '../../components/grid';
import Layout from '../../components/layout';
import PageHeader from '../../components/page-header';

import { getFooterMenu } from '../../lib/Menus';
import { getLatestPosts } from '../../lib/Posts';

export default function PostsListTemplate({ menuItems, posts }) {
	const RenderCurrentItems = ({ currentItems }) => {
		return <PostGrid contentType="posts" data={currentItems} />;
	};

	return (
		<Layout footerMenu={menuItems}>
			<NextSeo title="" description="" />
			<div>
				<PageHeader title="Posts" />
				<section>
					<Paginator
						data={posts}
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
	const { posts, headers: postHeaders } = await getLatestPosts(100);

	const headers = [menuItemHeaders, postHeaders];
	setOutgoingHeaders({ headers, res });

	return {
		props: {
			menuItems,
			posts,
		},
	};
}
