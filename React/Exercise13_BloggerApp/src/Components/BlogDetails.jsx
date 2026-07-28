const blogs = [
  { id: 1, title: 'Getting Started with React', published: true },
  { id: 2, title: 'Understanding the Virtual DOM', published: true },
  { id: 3, title: 'Draft: React 19 Notes', published: false },
];

function BlogDetails() {
  const publishedBlogs = blogs.filter((blog) => blog.published);

  return (
    <section>
      <h2>Blog Details</h2>
      {publishedBlogs.length > 0 ? (
        <ul>
          {publishedBlogs.map((blog) => (
            // Extracting a component with a stable key — React uses `key` to match array
            // items across renders, so it should not be the array index for a list that can
            // be reordered/filtered.
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>No published blogs yet.</p>
      )}
    </section>
  );
}

export default BlogDetails;
