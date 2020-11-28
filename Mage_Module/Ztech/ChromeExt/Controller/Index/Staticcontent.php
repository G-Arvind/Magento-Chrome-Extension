<?php
namespace Ztech\ChromeExt\Controller\Index;

use Magento\Framework\Controller\Result\JsonFactory;

class Staticcontent extends \Magento\Framework\App\Action\Action
{
    protected $_pageFactory;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Magento\Framework\View\Result\PageFactory $pageFactory,
        JsonFactory $resultJsonFactory,
        \Magento\Framework\App\Cache\Manager $cacheManager
    ) {
        $this->_pageFactory = $pageFactory;
        $this->resultJsonFactory = $resultJsonFactory;
        $this->cacheManager = $cacheManager;
        return parent::__construct($context);
    }

    public function execute()
    {
        $writer = new \Zend\Log\Writer\Stream(BP . '/var/log/extesnion.log');
        $logger = new \Zend\Log\Logger();
        $logger->addWriter($writer);
        $logger->info('Your text message' . json_encode($this->getRequest()->isAjax()));

        $command = 'php bin/magento s:s:d -f';
        echo '<pre>' . shell_exec($command) . '</pre>';

        $logger->info('cache flushed');

//        if ($this->getRequest()->isAjax()) {
//            $result = $this->resultJsonFactory->create();
//            $options []n/magento s:d:c';
        echo '<pre>' . shell_exec($command) . '</pre>';

        $logger->info('cache flushed');

//        if ($this->getRequ  =
//                [
//                    'dr_quote_error' => "hellwo thewe",
//                ];
//            return $result->setData($options);
//        } else {
//            $logger->info('else ' . json_encode($this->getRequest()->isAjax()));
//
//        }
    }
}
