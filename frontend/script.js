const jobs = [
  {id:1,title:"Frontend Developer",company:"Acme Inc",location:"Bengaluru, India",salary:"$120k - $150k/yr"},
  {id:2,title:"UI/UX Designer",company:"StudioX",location:"Remote",salary:"$80k - $110k/yr"},
  {id:3,title:"Backend Engineer",company:"Cloudify",location:"Pune, India",salary:"$110k - $140k/yr"},
  {id:4,title:"Product Manager",company:"ScaleUp",location:"Mumbai, India",salary:"$130k - $160k/yr"},
  {id:5,title:"Data Analyst",company:"Insight",location:"Remote",salary:"$90k - $120k/yr"},
  {id:6,title:"Marketing Lead",company:"GrowthLab",location:"Delhi, India",salary:"$70k - $95k/yr"}
];

function renderJobs(filter=""){
  const grid = document.getElementById('jobsGrid');
  grid.innerHTML = "";
  const filtered = jobs.filter(j => (j.title + j.company + j.location).toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
      <div>
        <h3>${job.title}</h3>
        <div class="muted">${job.company} • ${job.location}</div>
      </div>
      <div class="job-meta">
        <div class="job-salary">${job.salary}</div>
        <button class="btn btn-ghost" onclick="viewDetails(${job.id})">View Details</button>
      </div>
    `;
    grid.appendChild(card);
  })
}

function viewDetails(id){
  const j = jobs.find(x=>x.id===id);
  alert(`${j.title}\n${j.company}\n${j.location}\n${j.salary}`);
}

document.getElementById('searchBtn').addEventListener('click', ()=>{
  const q = document.getElementById('searchInput').value;
  renderJobs(q);
});
document.getElementById('searchInput').addEventListener('keyup', (e)=>{
  if(e.key === 'Enter') renderJobs(e.target.value);
});

// initial render
renderJobs();

function googleLogin() { alert("Google Login clicked!"); }
function facebookLogin() { alert("Facebook Login clicked!"); }
