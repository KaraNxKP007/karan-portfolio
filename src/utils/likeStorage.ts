type Vote = "like" | "dislike" | null;

function key(slug: string) {
  return `kp-blog-vote-${slug}`;
}
function countsKey(slug: string) {
  return `kp-blog-counts-${slug}`;
}

export function getVote(slug: string): Vote {
  return (localStorage.getItem(key(slug)) as Vote) || null;
}

export function getCounts(slug: string): { likes: number; dislikes: number } {
  const raw = localStorage.getItem(countsKey(slug));
  return raw ? JSON.parse(raw) : { likes: 0, dislikes: 0 };
}

export function setVote(slug: string, vote: Vote) {
  const current = getVote(slug);
  const counts = getCounts(slug);

  // undo previous vote
  if (current === "like") counts.likes = Math.max(0, counts.likes - 1);
  if (current === "dislike") counts.dislikes = Math.max(0, counts.dislikes - 1);

  // apply new vote (or clear if clicking same button again)
  const newVote = current === vote ? null : vote;
  if (newVote === "like") counts.likes += 1;
  if (newVote === "dislike") counts.dislikes += 1;

  localStorage.setItem(key(slug), newVote || "");
  localStorage.setItem(countsKey(slug), JSON.stringify(counts));

  return { vote: newVote, counts };
}