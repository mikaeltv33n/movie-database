async function getPosts () {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
    let data = await res.json()
    return data
}

export default async function Posts () {
    const posts = await getPosts();

    return ( 
    <section>
        {posts.map(post => (

            <article key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </article>
        ))}
    </section>
)}  