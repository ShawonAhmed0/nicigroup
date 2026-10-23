import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_companies_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp');
  CREATE TYPE "public"."enum_companies_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum_companies_bengali_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum_companies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__companies_v_version_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp');
  CREATE TYPE "public"."enum__companies_v_version_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum__companies_v_version_bengali_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum__companies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_wings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__wings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_concerns_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp');
  CREATE TYPE "public"."enum_concerns_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum_concerns_bengali_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum_concerns_kind" AS ENUM('csr', 'sister');
  CREATE TYPE "public"."enum_concerns_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__concerns_v_version_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp');
  CREATE TYPE "public"."enum__concerns_v_version_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum__concerns_v_version_bengali_feed_config_curated_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp', 'website');
  CREATE TYPE "public"."enum__concerns_v_version_kind" AS ENUM('csr', 'sister');
  CREATE TYPE "public"."enum__concerns_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'company-manager');
  CREATE TYPE "public"."enum_group_settings_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'youtube', 'x', 'tiktok', 'whatsapp');
  CREATE TABLE "companies_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "companies_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "companies_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "companies_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_companies_socials_platform",
  	"url" varchar
  );
  
  CREATE TABLE "companies_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"image_id" integer,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum_companies_feed_config_curated_platform" DEFAULT 'website'
  );
  
  CREATE TABLE "companies_bengali_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "companies_bengali_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "companies_bengali_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum_companies_bengali_feed_config_curated_platform" DEFAULT 'website'
  );
  
  CREATE TABLE "companies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"sector" varchar,
  	"summary" varchar,
  	"overview" jsonb,
  	"vision" jsonb,
  	"logo_id" integer,
  	"hero_image_id" integer,
  	"brand_colour" varchar DEFAULT '#2F5F82',
  	"established_year" numeric,
  	"feed_config_enabled" boolean DEFAULT true,
  	"feed_config_facebook_page_id" varchar,
  	"feed_config_instagram_user_id" varchar,
  	"feed_config_youtube_channel_id" varchar,
  	"contact_address" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_map_url" varchar,
  	"contact_enquiry_inbox" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"bengali_name" varchar,
  	"bengali_sector" varchar,
  	"bengali_summary" varchar,
  	"bengali_overview" jsonb,
  	"bengali_vision" jsonb,
  	"bengali_contact_address" varchar,
  	"bengali_seo_title" varchar,
  	"bengali_seo_description" varchar,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"show_on_home" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_companies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "companies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_companies_v_version_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v_version_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v_version_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__companies_v_version_socials_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v_version_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"image_id" integer,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum__companies_v_version_feed_config_curated_platform" DEFAULT 'website',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v_version_bengali_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v_version_bengali_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v_version_bengali_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum__companies_v_version_bengali_feed_config_curated_platform" DEFAULT 'website',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_companies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_sector" varchar,
  	"version_summary" varchar,
  	"version_overview" jsonb,
  	"version_vision" jsonb,
  	"version_logo_id" integer,
  	"version_hero_image_id" integer,
  	"version_brand_colour" varchar DEFAULT '#2F5F82',
  	"version_established_year" numeric,
  	"version_feed_config_enabled" boolean DEFAULT true,
  	"version_feed_config_facebook_page_id" varchar,
  	"version_feed_config_instagram_user_id" varchar,
  	"version_feed_config_youtube_channel_id" varchar,
  	"version_contact_address" varchar,
  	"version_contact_phone" varchar,
  	"version_contact_email" varchar,
  	"version_contact_map_url" varchar,
  	"version_contact_enquiry_inbox" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_bengali_name" varchar,
  	"version_bengali_sector" varchar,
  	"version_bengali_summary" varchar,
  	"version_bengali_overview" jsonb,
  	"version_bengali_vision" jsonb,
  	"version_bengali_contact_address" varchar,
  	"version_bengali_seo_title" varchar,
  	"version_bengali_seo_description" varchar,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_show_on_home" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__companies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_companies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "wings_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "wings_bengali_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "wings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_id" integer,
  	"name" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"bengali_name" varchar,
  	"bengali_summary" varchar,
  	"bengali_description" jsonb,
  	"bengali_seo_title" varchar,
  	"bengali_seo_description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_wings_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "wings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_wings_v_version_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_wings_v_version_bengali_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_wings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_company_id" integer,
  	"version_name" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_image_id" integer,
  	"version_bengali_name" varchar,
  	"version_bengali_summary" varchar,
  	"version_bengali_description" jsonb,
  	"version_bengali_seo_title" varchar,
  	"version_bengali_seo_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__wings_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_wings_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "concerns_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "concerns_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_concerns_socials_platform",
  	"url" varchar
  );
  
  CREATE TABLE "concerns_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"image_id" integer,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum_concerns_feed_config_curated_platform" DEFAULT 'website'
  );
  
  CREATE TABLE "concerns_bengali_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "concerns_bengali_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum_concerns_bengali_feed_config_curated_platform" DEFAULT 'website'
  );
  
  CREATE TABLE "concerns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"kind" "enum_concerns_kind" DEFAULT 'csr',
  	"tagline" varchar,
  	"summary" varchar,
  	"mission" jsonb,
  	"activities" jsonb,
  	"external_url" varchar,
  	"support_url" varchar,
  	"logo_id" integer,
  	"hero_image_id" integer,
  	"feed_config_enabled" boolean DEFAULT true,
  	"feed_config_facebook_page_id" varchar,
  	"feed_config_instagram_user_id" varchar,
  	"feed_config_youtube_channel_id" varchar,
  	"contact_address" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_map_url" varchar,
  	"contact_enquiry_inbox" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"bengali_name" varchar,
  	"bengali_tagline" varchar,
  	"bengali_summary" varchar,
  	"bengali_mission" jsonb,
  	"bengali_activities" jsonb,
  	"bengali_contact_address" varchar,
  	"bengali_seo_title" varchar,
  	"bengali_seo_description" varchar,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_concerns_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "concerns_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_concerns_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_concerns_v_version_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__concerns_v_version_socials_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_concerns_v_version_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"image_id" integer,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum__concerns_v_version_feed_config_curated_platform" DEFAULT 'website',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_concerns_v_version_bengali_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"unit" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_concerns_v_version_bengali_feed_config_curated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"date" timestamp(3) with time zone,
  	"url" varchar,
  	"platform" "enum__concerns_v_version_bengali_feed_config_curated_platform" DEFAULT 'website',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_concerns_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_kind" "enum__concerns_v_version_kind" DEFAULT 'csr',
  	"version_tagline" varchar,
  	"version_summary" varchar,
  	"version_mission" jsonb,
  	"version_activities" jsonb,
  	"version_external_url" varchar,
  	"version_support_url" varchar,
  	"version_logo_id" integer,
  	"version_hero_image_id" integer,
  	"version_feed_config_enabled" boolean DEFAULT true,
  	"version_feed_config_facebook_page_id" varchar,
  	"version_feed_config_instagram_user_id" varchar,
  	"version_feed_config_youtube_channel_id" varchar,
  	"version_contact_address" varchar,
  	"version_contact_phone" varchar,
  	"version_contact_email" varchar,
  	"version_contact_map_url" varchar,
  	"version_contact_enquiry_inbox" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_bengali_name" varchar,
  	"version_bengali_tagline" varchar,
  	"version_bengali_summary" varchar,
  	"version_bengali_mission" jsonb,
  	"version_bengali_activities" jsonb,
  	"version_bengali_contact_address" varchar,
  	"version_bengali_seo_title" varchar,
  	"version_bengali_seo_description" varchar,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__concerns_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_concerns_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"company_id" integer,
  	"wing_id" integer,
  	"year" numeric,
  	"location" varchar,
  	"client" varchar,
  	"cover_image_id" integer,
  	"summary" varchar,
  	"description" jsonb,
  	"featured" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"bengali_title" varchar,
  	"bengali_location" varchar,
  	"bengali_summary" varchar,
  	"bengali_description" jsonb,
  	"bengali_seo_title" varchar,
  	"bengali_seo_description" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_company_id" integer,
  	"version_wing_id" integer,
  	"version_year" numeric,
  	"version_location" varchar,
  	"version_client" varchar,
  	"version_cover_image_id" integer,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_featured" boolean DEFAULT false,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_bengali_title" varchar,
  	"version_bengali_location" varchar,
  	"version_bengali_summary" varchar,
  	"version_bengali_description" jsonb,
  	"version_bengali_seo_title" varchar,
  	"version_bengali_seo_description" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"published_at" timestamp(3) with time zone,
  	"company_id" integer,
  	"cover_image_id" integer,
  	"excerpt" varchar,
  	"body" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"bengali_title" varchar,
  	"bengali_excerpt" varchar,
  	"bengali_body" jsonb,
  	"bengali_seo_title" varchar,
  	"bengali_seo_description" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_company_id" integer,
  	"version_cover_image_id" integer,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_bengali_title" varchar,
  	"version_bengali_excerpt" varchar,
  	"version_bengali_body" jsonb,
  	"version_bengali_seo_title" varchar,
  	"version_bengali_seo_description" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"bengali_alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_wide_url" varchar,
  	"sizes_wide_width" numeric,
  	"sizes_wide_height" numeric,
  	"sizes_wide_mime_type" varchar,
  	"sizes_wide_filesize" numeric,
  	"sizes_wide_filename" varchar,
  	"sizes_share_url" varchar,
  	"sizes_share_width" numeric,
  	"sizes_share_height" numeric,
  	"sizes_share_mime_type" varchar,
  	"sizes_share_filesize" numeric,
  	"sizes_share_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"companies_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"companies_id" integer,
  	"wings_id" integer,
  	"concerns_id" integer,
  	"projects_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "group_settings_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"unit" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "group_settings_leadership" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"photo_id" integer,
  	"bio" varchar
  );
  
  CREATE TABLE "group_settings_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "group_settings_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"issuer" varchar,
  	"document_id" integer
  );
  
  CREATE TABLE "group_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_group_settings_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "group_settings_bengali_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"unit" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "group_settings_bengali_leadership" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"bio" varchar
  );
  
  CREATE TABLE "group_settings_bengali_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "group_settings_bengali_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"issuer" varchar
  );
  
  CREATE TABLE "group_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'NICI Group' NOT NULL,
  	"positioning" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"hero_image_id" integer,
  	"story" jsonb,
  	"mission" jsonb,
  	"chairman_name" varchar,
  	"chairman_title" varchar DEFAULT 'Chairman',
  	"chairman_portrait_id" integer,
  	"chairman_quote" varchar,
  	"chairman_message" jsonb,
  	"contact_address" varchar,
  	"contact_phone" varchar,
  	"contact_email" varchar,
  	"contact_map_url" varchar,
  	"contact_enquiry_inbox" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"bengali_name" varchar,
  	"bengali_positioning" varchar,
  	"bengali_summary" varchar,
  	"bengali_story" jsonb,
  	"bengali_mission" jsonb,
  	"bengali_chairman_name" varchar,
  	"bengali_chairman_title" varchar,
  	"bengali_chairman_quote" varchar,
  	"bengali_chairman_message" jsonb,
  	"bengali_contact_address" varchar,
  	"bengali_seo_title" varchar,
  	"bengali_seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "companies_capabilities" ADD CONSTRAINT "companies_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_stats" ADD CONSTRAINT "companies_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_partners" ADD CONSTRAINT "companies_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies_partners" ADD CONSTRAINT "companies_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_socials" ADD CONSTRAINT "companies_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_feed_config_curated" ADD CONSTRAINT "companies_feed_config_curated_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies_feed_config_curated" ADD CONSTRAINT "companies_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_bengali_capabilities" ADD CONSTRAINT "companies_bengali_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_bengali_stats" ADD CONSTRAINT "companies_bengali_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_bengali_feed_config_curated" ADD CONSTRAINT "companies_bengali_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies" ADD CONSTRAINT "companies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies" ADD CONSTRAINT "companies_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies" ADD CONSTRAINT "companies_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "companies_rels" ADD CONSTRAINT "companies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "companies_rels" ADD CONSTRAINT "companies_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_capabilities" ADD CONSTRAINT "_companies_v_version_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_stats" ADD CONSTRAINT "_companies_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_partners" ADD CONSTRAINT "_companies_v_version_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_companies_v_version_partners" ADD CONSTRAINT "_companies_v_version_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_socials" ADD CONSTRAINT "_companies_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_feed_config_curated" ADD CONSTRAINT "_companies_v_version_feed_config_curated_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_companies_v_version_feed_config_curated" ADD CONSTRAINT "_companies_v_version_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_bengali_capabilities" ADD CONSTRAINT "_companies_v_version_bengali_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_bengali_stats" ADD CONSTRAINT "_companies_v_version_bengali_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_version_bengali_feed_config_curated" ADD CONSTRAINT "_companies_v_version_bengali_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v" ADD CONSTRAINT "_companies_v_parent_id_companies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_companies_v" ADD CONSTRAINT "_companies_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_companies_v" ADD CONSTRAINT "_companies_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_companies_v" ADD CONSTRAINT "_companies_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_companies_v_rels" ADD CONSTRAINT "_companies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_companies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_companies_v_rels" ADD CONSTRAINT "_companies_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wings_details" ADD CONSTRAINT "wings_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wings_bengali_details" ADD CONSTRAINT "wings_bengali_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wings" ADD CONSTRAINT "wings_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wings" ADD CONSTRAINT "wings_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wings" ADD CONSTRAINT "wings_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "wings_rels" ADD CONSTRAINT "wings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."wings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wings_rels" ADD CONSTRAINT "wings_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wings_v_version_details" ADD CONSTRAINT "_wings_v_version_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wings_v_version_bengali_details" ADD CONSTRAINT "_wings_v_version_bengali_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wings_v" ADD CONSTRAINT "_wings_v_parent_id_wings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."wings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wings_v" ADD CONSTRAINT "_wings_v_version_company_id_companies_id_fk" FOREIGN KEY ("version_company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wings_v" ADD CONSTRAINT "_wings_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wings_v" ADD CONSTRAINT "_wings_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_wings_v_rels" ADD CONSTRAINT "_wings_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_wings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wings_v_rels" ADD CONSTRAINT "_wings_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concerns_stats" ADD CONSTRAINT "concerns_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concerns_socials" ADD CONSTRAINT "concerns_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concerns_feed_config_curated" ADD CONSTRAINT "concerns_feed_config_curated_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concerns_feed_config_curated" ADD CONSTRAINT "concerns_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concerns_bengali_stats" ADD CONSTRAINT "concerns_bengali_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concerns_bengali_feed_config_curated" ADD CONSTRAINT "concerns_bengali_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concerns" ADD CONSTRAINT "concerns_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concerns" ADD CONSTRAINT "concerns_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concerns" ADD CONSTRAINT "concerns_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "concerns_rels" ADD CONSTRAINT "concerns_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "concerns_rels" ADD CONSTRAINT "concerns_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_concerns_v_version_stats" ADD CONSTRAINT "_concerns_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_concerns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_concerns_v_version_socials" ADD CONSTRAINT "_concerns_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_concerns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_concerns_v_version_feed_config_curated" ADD CONSTRAINT "_concerns_v_version_feed_config_curated_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_concerns_v_version_feed_config_curated" ADD CONSTRAINT "_concerns_v_version_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_concerns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_concerns_v_version_bengali_stats" ADD CONSTRAINT "_concerns_v_version_bengali_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_concerns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_concerns_v_version_bengali_feed_config_curated" ADD CONSTRAINT "_concerns_v_version_bengali_feed_config_curated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_concerns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_concerns_v" ADD CONSTRAINT "_concerns_v_parent_id_concerns_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."concerns"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_concerns_v" ADD CONSTRAINT "_concerns_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_concerns_v" ADD CONSTRAINT "_concerns_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_concerns_v" ADD CONSTRAINT "_concerns_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_concerns_v_rels" ADD CONSTRAINT "_concerns_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_concerns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_concerns_v_rels" ADD CONSTRAINT "_concerns_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_wing_id_wings_id_fk" FOREIGN KEY ("wing_id") REFERENCES "public"."wings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_company_id_companies_id_fk" FOREIGN KEY ("version_company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_wing_id_wings_id_fk" FOREIGN KEY ("version_wing_id") REFERENCES "public"."wings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_company_id_companies_id_fk" FOREIGN KEY ("version_company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_companies_fk" FOREIGN KEY ("companies_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_wings_fk" FOREIGN KEY ("wings_id") REFERENCES "public"."wings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_concerns_fk" FOREIGN KEY ("concerns_id") REFERENCES "public"."concerns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_stats" ADD CONSTRAINT "group_settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_leadership" ADD CONSTRAINT "group_settings_leadership_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "group_settings_leadership" ADD CONSTRAINT "group_settings_leadership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_milestones" ADD CONSTRAINT "group_settings_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_certifications" ADD CONSTRAINT "group_settings_certifications_document_id_media_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "group_settings_certifications" ADD CONSTRAINT "group_settings_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_socials" ADD CONSTRAINT "group_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_bengali_stats" ADD CONSTRAINT "group_settings_bengali_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_bengali_leadership" ADD CONSTRAINT "group_settings_bengali_leadership_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_bengali_milestones" ADD CONSTRAINT "group_settings_bengali_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings_bengali_certifications" ADD CONSTRAINT "group_settings_bengali_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."group_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_settings" ADD CONSTRAINT "group_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "group_settings" ADD CONSTRAINT "group_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "group_settings" ADD CONSTRAINT "group_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "group_settings" ADD CONSTRAINT "group_settings_chairman_portrait_id_media_id_fk" FOREIGN KEY ("chairman_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "group_settings" ADD CONSTRAINT "group_settings_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "companies_capabilities_order_idx" ON "companies_capabilities" USING btree ("_order");
  CREATE INDEX "companies_capabilities_parent_id_idx" ON "companies_capabilities" USING btree ("_parent_id");
  CREATE INDEX "companies_stats_order_idx" ON "companies_stats" USING btree ("_order");
  CREATE INDEX "companies_stats_parent_id_idx" ON "companies_stats" USING btree ("_parent_id");
  CREATE INDEX "companies_partners_order_idx" ON "companies_partners" USING btree ("_order");
  CREATE INDEX "companies_partners_parent_id_idx" ON "companies_partners" USING btree ("_parent_id");
  CREATE INDEX "companies_partners_logo_idx" ON "companies_partners" USING btree ("logo_id");
  CREATE INDEX "companies_socials_order_idx" ON "companies_socials" USING btree ("_order");
  CREATE INDEX "companies_socials_parent_id_idx" ON "companies_socials" USING btree ("_parent_id");
  CREATE INDEX "companies_feed_config_curated_order_idx" ON "companies_feed_config_curated" USING btree ("_order");
  CREATE INDEX "companies_feed_config_curated_parent_id_idx" ON "companies_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "companies_feed_config_curated_image_idx" ON "companies_feed_config_curated" USING btree ("image_id");
  CREATE INDEX "companies_bengali_capabilities_order_idx" ON "companies_bengali_capabilities" USING btree ("_order");
  CREATE INDEX "companies_bengali_capabilities_parent_id_idx" ON "companies_bengali_capabilities" USING btree ("_parent_id");
  CREATE INDEX "companies_bengali_stats_order_idx" ON "companies_bengali_stats" USING btree ("_order");
  CREATE INDEX "companies_bengali_stats_parent_id_idx" ON "companies_bengali_stats" USING btree ("_parent_id");
  CREATE INDEX "companies_bengali_feed_config_curated_order_idx" ON "companies_bengali_feed_config_curated" USING btree ("_order");
  CREATE INDEX "companies_bengali_feed_config_curated_parent_id_idx" ON "companies_bengali_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "companies_logo_idx" ON "companies" USING btree ("logo_id");
  CREATE INDEX "companies_hero_image_idx" ON "companies" USING btree ("hero_image_id");
  CREATE INDEX "companies_seo_seo_image_idx" ON "companies" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "companies_slug_idx" ON "companies" USING btree ("slug");
  CREATE INDEX "companies_updated_at_idx" ON "companies" USING btree ("updated_at");
  CREATE INDEX "companies_created_at_idx" ON "companies" USING btree ("created_at");
  CREATE INDEX "companies__status_idx" ON "companies" USING btree ("_status");
  CREATE INDEX "companies_rels_order_idx" ON "companies_rels" USING btree ("order");
  CREATE INDEX "companies_rels_parent_idx" ON "companies_rels" USING btree ("parent_id");
  CREATE INDEX "companies_rels_path_idx" ON "companies_rels" USING btree ("path");
  CREATE INDEX "companies_rels_media_id_idx" ON "companies_rels" USING btree ("media_id");
  CREATE INDEX "_companies_v_version_capabilities_order_idx" ON "_companies_v_version_capabilities" USING btree ("_order");
  CREATE INDEX "_companies_v_version_capabilities_parent_id_idx" ON "_companies_v_version_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_version_stats_order_idx" ON "_companies_v_version_stats" USING btree ("_order");
  CREATE INDEX "_companies_v_version_stats_parent_id_idx" ON "_companies_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_version_partners_order_idx" ON "_companies_v_version_partners" USING btree ("_order");
  CREATE INDEX "_companies_v_version_partners_parent_id_idx" ON "_companies_v_version_partners" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_version_partners_logo_idx" ON "_companies_v_version_partners" USING btree ("logo_id");
  CREATE INDEX "_companies_v_version_socials_order_idx" ON "_companies_v_version_socials" USING btree ("_order");
  CREATE INDEX "_companies_v_version_socials_parent_id_idx" ON "_companies_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_version_feed_config_curated_order_idx" ON "_companies_v_version_feed_config_curated" USING btree ("_order");
  CREATE INDEX "_companies_v_version_feed_config_curated_parent_id_idx" ON "_companies_v_version_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_version_feed_config_curated_image_idx" ON "_companies_v_version_feed_config_curated" USING btree ("image_id");
  CREATE INDEX "_companies_v_version_bengali_capabilities_order_idx" ON "_companies_v_version_bengali_capabilities" USING btree ("_order");
  CREATE INDEX "_companies_v_version_bengali_capabilities_parent_id_idx" ON "_companies_v_version_bengali_capabilities" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_version_bengali_stats_order_idx" ON "_companies_v_version_bengali_stats" USING btree ("_order");
  CREATE INDEX "_companies_v_version_bengali_stats_parent_id_idx" ON "_companies_v_version_bengali_stats" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_version_bengali_feed_config_curated_order_idx" ON "_companies_v_version_bengali_feed_config_curated" USING btree ("_order");
  CREATE INDEX "_companies_v_version_bengali_feed_config_curated_parent_id_idx" ON "_companies_v_version_bengali_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "_companies_v_parent_idx" ON "_companies_v" USING btree ("parent_id");
  CREATE INDEX "_companies_v_version_version_logo_idx" ON "_companies_v" USING btree ("version_logo_id");
  CREATE INDEX "_companies_v_version_version_hero_image_idx" ON "_companies_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_companies_v_version_seo_version_seo_image_idx" ON "_companies_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_companies_v_version_version_slug_idx" ON "_companies_v" USING btree ("version_slug");
  CREATE INDEX "_companies_v_version_version_updated_at_idx" ON "_companies_v" USING btree ("version_updated_at");
  CREATE INDEX "_companies_v_version_version_created_at_idx" ON "_companies_v" USING btree ("version_created_at");
  CREATE INDEX "_companies_v_version_version__status_idx" ON "_companies_v" USING btree ("version__status");
  CREATE INDEX "_companies_v_created_at_idx" ON "_companies_v" USING btree ("created_at");
  CREATE INDEX "_companies_v_updated_at_idx" ON "_companies_v" USING btree ("updated_at");
  CREATE INDEX "_companies_v_latest_idx" ON "_companies_v" USING btree ("latest");
  CREATE INDEX "_companies_v_rels_order_idx" ON "_companies_v_rels" USING btree ("order");
  CREATE INDEX "_companies_v_rels_parent_idx" ON "_companies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_companies_v_rels_path_idx" ON "_companies_v_rels" USING btree ("path");
  CREATE INDEX "_companies_v_rels_media_id_idx" ON "_companies_v_rels" USING btree ("media_id");
  CREATE INDEX "wings_details_order_idx" ON "wings_details" USING btree ("_order");
  CREATE INDEX "wings_details_parent_id_idx" ON "wings_details" USING btree ("_parent_id");
  CREATE INDEX "wings_bengali_details_order_idx" ON "wings_bengali_details" USING btree ("_order");
  CREATE INDEX "wings_bengali_details_parent_id_idx" ON "wings_bengali_details" USING btree ("_parent_id");
  CREATE INDEX "wings_company_idx" ON "wings" USING btree ("company_id");
  CREATE INDEX "wings_image_idx" ON "wings" USING btree ("image_id");
  CREATE INDEX "wings_seo_seo_image_idx" ON "wings" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "wings_slug_idx" ON "wings" USING btree ("slug");
  CREATE INDEX "wings_updated_at_idx" ON "wings" USING btree ("updated_at");
  CREATE INDEX "wings_created_at_idx" ON "wings" USING btree ("created_at");
  CREATE INDEX "wings__status_idx" ON "wings" USING btree ("_status");
  CREATE INDEX "wings_rels_order_idx" ON "wings_rels" USING btree ("order");
  CREATE INDEX "wings_rels_parent_idx" ON "wings_rels" USING btree ("parent_id");
  CREATE INDEX "wings_rels_path_idx" ON "wings_rels" USING btree ("path");
  CREATE INDEX "wings_rels_media_id_idx" ON "wings_rels" USING btree ("media_id");
  CREATE INDEX "_wings_v_version_details_order_idx" ON "_wings_v_version_details" USING btree ("_order");
  CREATE INDEX "_wings_v_version_details_parent_id_idx" ON "_wings_v_version_details" USING btree ("_parent_id");
  CREATE INDEX "_wings_v_version_bengali_details_order_idx" ON "_wings_v_version_bengali_details" USING btree ("_order");
  CREATE INDEX "_wings_v_version_bengali_details_parent_id_idx" ON "_wings_v_version_bengali_details" USING btree ("_parent_id");
  CREATE INDEX "_wings_v_parent_idx" ON "_wings_v" USING btree ("parent_id");
  CREATE INDEX "_wings_v_version_version_company_idx" ON "_wings_v" USING btree ("version_company_id");
  CREATE INDEX "_wings_v_version_version_image_idx" ON "_wings_v" USING btree ("version_image_id");
  CREATE INDEX "_wings_v_version_seo_version_seo_image_idx" ON "_wings_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_wings_v_version_version_slug_idx" ON "_wings_v" USING btree ("version_slug");
  CREATE INDEX "_wings_v_version_version_updated_at_idx" ON "_wings_v" USING btree ("version_updated_at");
  CREATE INDEX "_wings_v_version_version_created_at_idx" ON "_wings_v" USING btree ("version_created_at");
  CREATE INDEX "_wings_v_version_version__status_idx" ON "_wings_v" USING btree ("version__status");
  CREATE INDEX "_wings_v_created_at_idx" ON "_wings_v" USING btree ("created_at");
  CREATE INDEX "_wings_v_updated_at_idx" ON "_wings_v" USING btree ("updated_at");
  CREATE INDEX "_wings_v_latest_idx" ON "_wings_v" USING btree ("latest");
  CREATE INDEX "_wings_v_rels_order_idx" ON "_wings_v_rels" USING btree ("order");
  CREATE INDEX "_wings_v_rels_parent_idx" ON "_wings_v_rels" USING btree ("parent_id");
  CREATE INDEX "_wings_v_rels_path_idx" ON "_wings_v_rels" USING btree ("path");
  CREATE INDEX "_wings_v_rels_media_id_idx" ON "_wings_v_rels" USING btree ("media_id");
  CREATE INDEX "concerns_stats_order_idx" ON "concerns_stats" USING btree ("_order");
  CREATE INDEX "concerns_stats_parent_id_idx" ON "concerns_stats" USING btree ("_parent_id");
  CREATE INDEX "concerns_socials_order_idx" ON "concerns_socials" USING btree ("_order");
  CREATE INDEX "concerns_socials_parent_id_idx" ON "concerns_socials" USING btree ("_parent_id");
  CREATE INDEX "concerns_feed_config_curated_order_idx" ON "concerns_feed_config_curated" USING btree ("_order");
  CREATE INDEX "concerns_feed_config_curated_parent_id_idx" ON "concerns_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "concerns_feed_config_curated_image_idx" ON "concerns_feed_config_curated" USING btree ("image_id");
  CREATE INDEX "concerns_bengali_stats_order_idx" ON "concerns_bengali_stats" USING btree ("_order");
  CREATE INDEX "concerns_bengali_stats_parent_id_idx" ON "concerns_bengali_stats" USING btree ("_parent_id");
  CREATE INDEX "concerns_bengali_feed_config_curated_order_idx" ON "concerns_bengali_feed_config_curated" USING btree ("_order");
  CREATE INDEX "concerns_bengali_feed_config_curated_parent_id_idx" ON "concerns_bengali_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "concerns_logo_idx" ON "concerns" USING btree ("logo_id");
  CREATE INDEX "concerns_hero_image_idx" ON "concerns" USING btree ("hero_image_id");
  CREATE INDEX "concerns_seo_seo_image_idx" ON "concerns" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "concerns_slug_idx" ON "concerns" USING btree ("slug");
  CREATE INDEX "concerns_updated_at_idx" ON "concerns" USING btree ("updated_at");
  CREATE INDEX "concerns_created_at_idx" ON "concerns" USING btree ("created_at");
  CREATE INDEX "concerns__status_idx" ON "concerns" USING btree ("_status");
  CREATE INDEX "concerns_rels_order_idx" ON "concerns_rels" USING btree ("order");
  CREATE INDEX "concerns_rels_parent_idx" ON "concerns_rels" USING btree ("parent_id");
  CREATE INDEX "concerns_rels_path_idx" ON "concerns_rels" USING btree ("path");
  CREATE INDEX "concerns_rels_media_id_idx" ON "concerns_rels" USING btree ("media_id");
  CREATE INDEX "_concerns_v_version_stats_order_idx" ON "_concerns_v_version_stats" USING btree ("_order");
  CREATE INDEX "_concerns_v_version_stats_parent_id_idx" ON "_concerns_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_concerns_v_version_socials_order_idx" ON "_concerns_v_version_socials" USING btree ("_order");
  CREATE INDEX "_concerns_v_version_socials_parent_id_idx" ON "_concerns_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_concerns_v_version_feed_config_curated_order_idx" ON "_concerns_v_version_feed_config_curated" USING btree ("_order");
  CREATE INDEX "_concerns_v_version_feed_config_curated_parent_id_idx" ON "_concerns_v_version_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "_concerns_v_version_feed_config_curated_image_idx" ON "_concerns_v_version_feed_config_curated" USING btree ("image_id");
  CREATE INDEX "_concerns_v_version_bengali_stats_order_idx" ON "_concerns_v_version_bengali_stats" USING btree ("_order");
  CREATE INDEX "_concerns_v_version_bengali_stats_parent_id_idx" ON "_concerns_v_version_bengali_stats" USING btree ("_parent_id");
  CREATE INDEX "_concerns_v_version_bengali_feed_config_curated_order_idx" ON "_concerns_v_version_bengali_feed_config_curated" USING btree ("_order");
  CREATE INDEX "_concerns_v_version_bengali_feed_config_curated_parent_id_idx" ON "_concerns_v_version_bengali_feed_config_curated" USING btree ("_parent_id");
  CREATE INDEX "_concerns_v_parent_idx" ON "_concerns_v" USING btree ("parent_id");
  CREATE INDEX "_concerns_v_version_version_logo_idx" ON "_concerns_v" USING btree ("version_logo_id");
  CREATE INDEX "_concerns_v_version_version_hero_image_idx" ON "_concerns_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_concerns_v_version_seo_version_seo_image_idx" ON "_concerns_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_concerns_v_version_version_slug_idx" ON "_concerns_v" USING btree ("version_slug");
  CREATE INDEX "_concerns_v_version_version_updated_at_idx" ON "_concerns_v" USING btree ("version_updated_at");
  CREATE INDEX "_concerns_v_version_version_created_at_idx" ON "_concerns_v" USING btree ("version_created_at");
  CREATE INDEX "_concerns_v_version_version__status_idx" ON "_concerns_v" USING btree ("version__status");
  CREATE INDEX "_concerns_v_created_at_idx" ON "_concerns_v" USING btree ("created_at");
  CREATE INDEX "_concerns_v_updated_at_idx" ON "_concerns_v" USING btree ("updated_at");
  CREATE INDEX "_concerns_v_latest_idx" ON "_concerns_v" USING btree ("latest");
  CREATE INDEX "_concerns_v_rels_order_idx" ON "_concerns_v_rels" USING btree ("order");
  CREATE INDEX "_concerns_v_rels_parent_idx" ON "_concerns_v_rels" USING btree ("parent_id");
  CREATE INDEX "_concerns_v_rels_path_idx" ON "_concerns_v_rels" USING btree ("path");
  CREATE INDEX "_concerns_v_rels_media_id_idx" ON "_concerns_v_rels" USING btree ("media_id");
  CREATE INDEX "projects_company_idx" ON "projects" USING btree ("company_id");
  CREATE INDEX "projects_wing_idx" ON "projects" USING btree ("wing_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_company_idx" ON "_projects_v" USING btree ("version_company_id");
  CREATE INDEX "_projects_v_version_version_wing_idx" ON "_projects_v" USING btree ("version_wing_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_image_idx" ON "_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "news_company_idx" ON "news" USING btree ("company_id");
  CREATE INDEX "news_cover_image_idx" ON "news" USING btree ("cover_image_id");
  CREATE INDEX "news_seo_seo_image_idx" ON "news" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_company_idx" ON "_news_v" USING btree ("version_company_id");
  CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_news_v_version_seo_version_seo_image_idx" ON "_news_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_wide_sizes_wide_filename_idx" ON "media" USING btree ("sizes_wide_filename");
  CREATE INDEX "media_sizes_share_sizes_share_filename_idx" ON "media" USING btree ("sizes_share_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_companies_id_idx" ON "users_rels" USING btree ("companies_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_companies_id_idx" ON "payload_locked_documents_rels" USING btree ("companies_id");
  CREATE INDEX "payload_locked_documents_rels_wings_id_idx" ON "payload_locked_documents_rels" USING btree ("wings_id");
  CREATE INDEX "payload_locked_documents_rels_concerns_id_idx" ON "payload_locked_documents_rels" USING btree ("concerns_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "group_settings_stats_order_idx" ON "group_settings_stats" USING btree ("_order");
  CREATE INDEX "group_settings_stats_parent_id_idx" ON "group_settings_stats" USING btree ("_parent_id");
  CREATE INDEX "group_settings_leadership_order_idx" ON "group_settings_leadership" USING btree ("_order");
  CREATE INDEX "group_settings_leadership_parent_id_idx" ON "group_settings_leadership" USING btree ("_parent_id");
  CREATE INDEX "group_settings_leadership_photo_idx" ON "group_settings_leadership" USING btree ("photo_id");
  CREATE INDEX "group_settings_milestones_order_idx" ON "group_settings_milestones" USING btree ("_order");
  CREATE INDEX "group_settings_milestones_parent_id_idx" ON "group_settings_milestones" USING btree ("_parent_id");
  CREATE INDEX "group_settings_certifications_order_idx" ON "group_settings_certifications" USING btree ("_order");
  CREATE INDEX "group_settings_certifications_parent_id_idx" ON "group_settings_certifications" USING btree ("_parent_id");
  CREATE INDEX "group_settings_certifications_document_idx" ON "group_settings_certifications" USING btree ("document_id");
  CREATE INDEX "group_settings_socials_order_idx" ON "group_settings_socials" USING btree ("_order");
  CREATE INDEX "group_settings_socials_parent_id_idx" ON "group_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "group_settings_bengali_stats_order_idx" ON "group_settings_bengali_stats" USING btree ("_order");
  CREATE INDEX "group_settings_bengali_stats_parent_id_idx" ON "group_settings_bengali_stats" USING btree ("_parent_id");
  CREATE INDEX "group_settings_bengali_leadership_order_idx" ON "group_settings_bengali_leadership" USING btree ("_order");
  CREATE INDEX "group_settings_bengali_leadership_parent_id_idx" ON "group_settings_bengali_leadership" USING btree ("_parent_id");
  CREATE INDEX "group_settings_bengali_milestones_order_idx" ON "group_settings_bengali_milestones" USING btree ("_order");
  CREATE INDEX "group_settings_bengali_milestones_parent_id_idx" ON "group_settings_bengali_milestones" USING btree ("_parent_id");
  CREATE INDEX "group_settings_bengali_certifications_order_idx" ON "group_settings_bengali_certifications" USING btree ("_order");
  CREATE INDEX "group_settings_bengali_certifications_parent_id_idx" ON "group_settings_bengali_certifications" USING btree ("_parent_id");
  CREATE INDEX "group_settings_logo_idx" ON "group_settings" USING btree ("logo_id");
  CREATE INDEX "group_settings_logo_dark_idx" ON "group_settings" USING btree ("logo_dark_id");
  CREATE INDEX "group_settings_hero_image_idx" ON "group_settings" USING btree ("hero_image_id");
  CREATE INDEX "group_settings_chairman_chairman_portrait_idx" ON "group_settings" USING btree ("chairman_portrait_id");
  CREATE INDEX "group_settings_seo_seo_image_idx" ON "group_settings" USING btree ("seo_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "companies_capabilities" CASCADE;
  DROP TABLE "companies_stats" CASCADE;
  DROP TABLE "companies_partners" CASCADE;
  DROP TABLE "companies_socials" CASCADE;
  DROP TABLE "companies_feed_config_curated" CASCADE;
  DROP TABLE "companies_bengali_capabilities" CASCADE;
  DROP TABLE "companies_bengali_stats" CASCADE;
  DROP TABLE "companies_bengali_feed_config_curated" CASCADE;
  DROP TABLE "companies" CASCADE;
  DROP TABLE "companies_rels" CASCADE;
  DROP TABLE "_companies_v_version_capabilities" CASCADE;
  DROP TABLE "_companies_v_version_stats" CASCADE;
  DROP TABLE "_companies_v_version_partners" CASCADE;
  DROP TABLE "_companies_v_version_socials" CASCADE;
  DROP TABLE "_companies_v_version_feed_config_curated" CASCADE;
  DROP TABLE "_companies_v_version_bengali_capabilities" CASCADE;
  DROP TABLE "_companies_v_version_bengali_stats" CASCADE;
  DROP TABLE "_companies_v_version_bengali_feed_config_curated" CASCADE;
  DROP TABLE "_companies_v" CASCADE;
  DROP TABLE "_companies_v_rels" CASCADE;
  DROP TABLE "wings_details" CASCADE;
  DROP TABLE "wings_bengali_details" CASCADE;
  DROP TABLE "wings" CASCADE;
  DROP TABLE "wings_rels" CASCADE;
  DROP TABLE "_wings_v_version_details" CASCADE;
  DROP TABLE "_wings_v_version_bengali_details" CASCADE;
  DROP TABLE "_wings_v" CASCADE;
  DROP TABLE "_wings_v_rels" CASCADE;
  DROP TABLE "concerns_stats" CASCADE;
  DROP TABLE "concerns_socials" CASCADE;
  DROP TABLE "concerns_feed_config_curated" CASCADE;
  DROP TABLE "concerns_bengali_stats" CASCADE;
  DROP TABLE "concerns_bengali_feed_config_curated" CASCADE;
  DROP TABLE "concerns" CASCADE;
  DROP TABLE "concerns_rels" CASCADE;
  DROP TABLE "_concerns_v_version_stats" CASCADE;
  DROP TABLE "_concerns_v_version_socials" CASCADE;
  DROP TABLE "_concerns_v_version_feed_config_curated" CASCADE;
  DROP TABLE "_concerns_v_version_bengali_stats" CASCADE;
  DROP TABLE "_concerns_v_version_bengali_feed_config_curated" CASCADE;
  DROP TABLE "_concerns_v" CASCADE;
  DROP TABLE "_concerns_v_rels" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "group_settings_stats" CASCADE;
  DROP TABLE "group_settings_leadership" CASCADE;
  DROP TABLE "group_settings_milestones" CASCADE;
  DROP TABLE "group_settings_certifications" CASCADE;
  DROP TABLE "group_settings_socials" CASCADE;
  DROP TABLE "group_settings_bengali_stats" CASCADE;
  DROP TABLE "group_settings_bengali_leadership" CASCADE;
  DROP TABLE "group_settings_bengali_milestones" CASCADE;
  DROP TABLE "group_settings_bengali_certifications" CASCADE;
  DROP TABLE "group_settings" CASCADE;
  DROP TYPE "public"."enum_companies_socials_platform";
  DROP TYPE "public"."enum_companies_feed_config_curated_platform";
  DROP TYPE "public"."enum_companies_bengali_feed_config_curated_platform";
  DROP TYPE "public"."enum_companies_status";
  DROP TYPE "public"."enum__companies_v_version_socials_platform";
  DROP TYPE "public"."enum__companies_v_version_feed_config_curated_platform";
  DROP TYPE "public"."enum__companies_v_version_bengali_feed_config_curated_platform";
  DROP TYPE "public"."enum__companies_v_version_status";
  DROP TYPE "public"."enum_wings_status";
  DROP TYPE "public"."enum__wings_v_version_status";
  DROP TYPE "public"."enum_concerns_socials_platform";
  DROP TYPE "public"."enum_concerns_feed_config_curated_platform";
  DROP TYPE "public"."enum_concerns_bengali_feed_config_curated_platform";
  DROP TYPE "public"."enum_concerns_kind";
  DROP TYPE "public"."enum_concerns_status";
  DROP TYPE "public"."enum__concerns_v_version_socials_platform";
  DROP TYPE "public"."enum__concerns_v_version_feed_config_curated_platform";
  DROP TYPE "public"."enum__concerns_v_version_bengali_feed_config_curated_platform";
  DROP TYPE "public"."enum__concerns_v_version_kind";
  DROP TYPE "public"."enum__concerns_v_version_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_group_settings_socials_platform";`)
}
