import { Suspense, useEffect, useState } from "react";
import axios from "axios";

import CardList from "../../components/CardList";
import Container from "../../components/Container";
import Filter from "../../components/Filter";
import Search from "../../components/Search";
import Hero from "../../components/Hero";
import Wrapper from "../../components/Wrapper";
import Button from "../../components/Button";

import heroImage from "../../assets/images/hero.png";

function Home() {
	const API_URL = "http://localhost:5010/posts/";
	const postPerPage = 10;

	const [posts, setPosts] = useState([]);
	const [loadMore, setLoadMore] = useState(true);
	const [skip, setSkip] = useState(0);

	// skip = posts starting by [skip] id
	const loadPosts = () => {
		axios
			.get(API_URL, {
				params: {
					skip: skip || 0,
					limit: postPerPage,
				},
			})
			.then((res) => {
				setPosts([...posts, ...res.data.data]);
				setSkip((preventNumbers) => preventNumbers + 10);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		loadPosts();
	}, []);

	const categoryLoad = (e) => {
		const category = e.value;
		axios
			.get(`${API_URL}/category/${category}`)
			.then((res) => {
				setPosts([...res.data.products]);
				setLoadMore(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const postSearch = (e) => {
		const query = e.target.value;
		axios
			.get(`${API_URL}/search?q=${query}`)
			.then((res) => {
				setPosts([...res.data.products]);
				if (query === "") {
					setLoadMore(true);
				} else {
					setLoadMore(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Hero image={heroImage} />
			<div className="content">
				<Container>
					<Wrapper>
						<Filter categoryHandler={categoryLoad} />
						<Search postsHandler={postSearch} />
					</Wrapper>
					<Wrapper>
						<Suspense fallback={<h1>Loading posts...</h1>}>
							{posts && <CardList data={posts} />}
						</Suspense>
						{loadMore ? (
							<Button
								onClick={loadPosts}
								className="button--large"
							>
								Load More
							</Button>
						) : (
							false
						)}
					</Wrapper>
				</Container>
			</div>
		</>
	);
}

export default Home;
