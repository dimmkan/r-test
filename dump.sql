--
-- PostgreSQL database dump
--

-- Dumped from database version 11.12
-- Dumped by pg_dump version 11.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    parent_id integer,
    name text NOT NULL,
    active smallint DEFAULT 1 NOT NULL,
    level integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: goods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.goods (
    id integer NOT NULL,
    category_id integer NOT NULL,
    name text NOT NULL,
    count bigint DEFAULT 0 NOT NULL,
    active smallint DEFAULT 1 NOT NULL
);


ALTER TABLE public.goods OWNER TO postgres;

--
-- Name: goods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.goods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.goods_id_seq OWNER TO postgres;

--
-- Name: goods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.goods_id_seq OWNED BY public.goods.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: goods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goods ALTER COLUMN id SET DEFAULT nextval('public.goods_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (1, NULL, 'Родительская категория 1', 1, 1);
INSERT INTO public.categories VALUES (3, 1, 'Подчиненная категория 1', 1, 2);
INSERT INTO public.categories VALUES (4, 1, 'Подчиненная категория 2', 0, 2);
INSERT INTO public.categories VALUES (6, 3, 'Подчиненная категория 4', 1, 3);
INSERT INTO public.categories VALUES (5, 3, 'Подчиненная категория 3', 1, 3);
INSERT INTO public.categories VALUES (14, NULL, 'Родительская категория 2', 1, 1);
INSERT INTO public.categories VALUES (13, 14, 'New category (update 3)', 1, 2);
INSERT INTO public.categories VALUES (7, 14, 'Подчиненная категория 7', 1, 2);


--
-- Data for Name: goods; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.goods VALUES (1, 1, 'Товар 1', 10, 1);
INSERT INTO public.goods VALUES (3, 3, 'Товар 1', 50, 1);
INSERT INTO public.goods VALUES (4, 3, 'Товар 2', 20, 1);
INSERT INTO public.goods VALUES (5, 5, 'Товар 3', 100, 1);
INSERT INTO public.goods VALUES (2, 13, 'Товар 2', 10, 1);
INSERT INTO public.goods VALUES (6, 4, 'Новый товар (изменение)', 200, 1);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 17, true);


--
-- Name: goods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.goods_id_seq', 9, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: goods goods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goods
    ADD CONSTRAINT goods_pkey PRIMARY KEY (id);


--
-- Name: goods FK_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goods
    ADD CONSTRAINT "FK_category_id" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

