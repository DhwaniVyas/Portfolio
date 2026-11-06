import { ArrowUpRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index, onOpen }) {
  return <motion.article className="project-card" layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .45, delay: (index % 3) * .06 }}>
    <button className="project-open" onClick={() => onOpen(project)} aria-label={`View ${project.name} details`}>
      <div className="project-image-wrap">
        <img className="project-image" src={project.image} alt={project.imageAlt} loading="lazy"/>
        <span className="project-image-index">{project.number} / 09</span>
        <span className="project-image-open"><ArrowUpRight size={19}/></span>
        <span className="project-image-category">{project.category}</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-top"><span className="eyebrow">{project.type.toUpperCase()}</span><span className="project-card-index">{project.number}</span></div>
        <h3>{project.name}</h3>
        <p>{project.intro}</p>
        <div className="tag-row">{project.stack.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-card-foot"><span>VIEW PROJECT DETAILS <Plus size={13}/></span><span className="project-card-index">CASE STUDY</span></div>
      </div>
    </button>
  </motion.article>
}
