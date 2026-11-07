import { sanityClient } from './sanity'
import type { Project, ExperienceEntry, Article, SkillGroup } from '../types/content'

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(`*[_type == "project"] | order(_createdAt asc) {
    "slug": slug.current,
    title, category, categoryLabel, summary, contribution,
    tech, caseStudyPath, verification, liveUrl, sourceUrl
  }`)
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  return sanityClient.fetch(`*[_type == "experienceEntry"] | order(order asc) {
    id, kind, title, organisation, period, summary, skills, credentialUrl, placeholder
  }`)
}

export async function getArticles(): Promise<Article[]> {
  return sanityClient.fetch(`*[_type == "article"] | order(_createdAt asc) {
    "slug": slug.current,
    title, summary, topic, status, publishedOn
  }`)
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  return sanityClient.fetch(`*[_type == "skillGroup"] | order(order asc) {
    category, items
  }`)
}
