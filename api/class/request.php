<?php
class RequestHelper
{
	private $posts;
	private $gets;
	
	protected function __construct()
	{
		$this->posts	= $_POST;
		$this->gets		= $_GET;
	}
	
	/**
	 * Get Request Param
	 * @param String : $name
	 * @return String || Boolean
	 */
	public function getRequestParam($name)
	{
		if ( isset($this->gets[$name]) ) {
			return $this->gets[$name];
		}
		return false;
	}
	
	/**
	 * Get Request Param
	 * @param String : $name
	 * @return String || Boolean
	 */
	public function getPostParam($name)
	{
		if ( isset($this->posts[$name]) ) {
			return $this->posts[$name];
		}
		return false;
	}
	
	/**
	 * Get Request Param
	 * @param String : $name
	 * @param Boolean : $default : false
	 * @return String || Boolean
	 */
	static function getParam($name, $default = false)
	{
		$newRequest	= new RequestHelper();
		$value	= $newRequest->getRequestParam($name);
		if ( $value == false ) {
			return $default;
		}
		return trim($value);
	}
	
	/**
	 * Get Request Param
	 * @param String : $name
	 * @param Boolean : $default : false
	 * @return String || Boolean
	 */
	static function getPost($name, $default = false)
	{
		$newRequest	= new RequestHelper();
		$value	= $newRequest->getPostParam($name);
		if ( $value == false ) {
			return $default;
		}
		return trim($value);
	}
}
?>