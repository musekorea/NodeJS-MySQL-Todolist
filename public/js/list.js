/* const linkBtns = document.querySelectorAll('.link');

linkBtns.forEach((linkBtn) => {
  linkBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const descFetch = await fetch(
        `http://localhost:8080/description/${linkBtn.id}`
      );
      console.log(descFetch.status);
      if (descFetch.status === 200) {
        window.location.href = `http://localhost:8080/description/${linkBtn.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  });
});
 */
