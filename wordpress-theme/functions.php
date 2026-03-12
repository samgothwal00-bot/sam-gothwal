<?php
/**
 * Sam Portfolio functions and definitions
 */

function sam_portfolio_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'sam-portfolio'),
    ));
}
add_action('after_setup_theme', 'sam_portfolio_setup');

function sam_portfolio_scripts() {
    wp_enqueue_style('sam-portfolio-style', get_stylesheet_uri());
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
    wp_enqueue_script('sam-portfolio-scripts', get_template_directory_uri() . '/js/main.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'sam_portfolio_scripts');
